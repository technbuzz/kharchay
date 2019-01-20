import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NavController, DateTime, AlertController, Header } from 'ionic-angular';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { buffer, throttleTime, map, filter } from "rxjs/operators";

import { AngularFireStorage } from 'angularfire2/storage';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import isAfter from 'date-fns/is_after';
import startOfMonth from 'date-fns/start_of_month';
import { Flip } from "number-flip";

import { Expense } from './expense.model';
import { categories } from '../../shared/categories';
import { IExpense } from '../../shared/expense.interface';
import { ICategory } from '../../shared/category.interface';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('expenseDate')
  expenseDate: DateTime;

  @ViewChild(Header) header: Header;

  @ViewChild('flip', {read: ElementRef}) private flipTotal: ElementRef;

  cdo = new Date();
  currentMonth = format(new Date(), 'MMMM');
  startOfMonth = startOfMonth(this.cdo);
  subscriptions: Subscription = new Subscription();
  expense: IExpense = {
    price: null,
    note: '',
    category: null,
    date: new Date().toISOString(),
    imageName: '',
    imageUrl: ''
  };

  categories = [];
  showSubCategory: boolean = false;
  selectedSubCategory: '';
  subCategories: ICategory;

  total: number = 0;
  isWorking: boolean = false;
  maxDate: string;
  flipAnim: any = '';
  dynamicPricing: boolean = true;

  expCollRef: AngularFirestoreCollection<any> = this.afs.collection(
    'expense',
    ref => ref.orderBy('date', 'desc').where('date', '>=', this.startOfMonth)
  );
  expenses: Observable<Expense[]>;

  constructor(
    private events: Events,
    public navCtrl: NavController,
    public afs: AngularFirestore,
    private alertCtrl: AlertController,
    private storage: AngularFireStorage,
    private settingsProvider: SettingsProvider
  ) {
    Object.assign(this.categories, categories);
  }

  ngOnInit(): void {
    this.expenses = this.expCollRef.valueChanges();
        
    this.expenses.subscribe((values) => {
      new Promise((resolve, reject) => {
        this.total = values.reduce((prev, current, index, array) => {
          if(index === array.length - 1) resolve('😎');
          return prev + Number(current.price);
        }, 0);
      }).then(resolve => {
        this.flip(Math.round(this.total));        
      }) //Promise
    })//forEach

    
  }

  flip(to:number){
    if(!this.flipAnim){
      this.flipAnim = new Flip({
        node: this.flipTotal.nativeElement,
        from: 9999,
        duration: 3,
        delay: 3
      })
    }

    this.flipAnim.flipTo({
      to
    })
  }

  ionViewDidLoad() {
    this.maxDate = this.cdo.toISOString().split('T')[0];

    // clickStream for Settings Page
    const secretElement = this.header.getElementRef().nativeElement;
    const clickStream = Observable.fromEvent(secretElement, 'click');
    this.subscriptions.add(clickStream
    .pipe(
      buffer(clickStream.pipe(throttleTime(500))),
      map(arr => arr.length),
      filter(len => len === 4)
      )
    .subscribe(resp => {
      console.log('clicked', resp);
      this.navCtrl.push('SettingsPage')
    }))


    this.settingsProvider.getConfig().subscribe(initialSettings => {
      this.dynamicPricing = initialSettings;
    })


    // dynamicPricing event management
    this.events.subscribe('dynamic:Pricing', (boolean) => {
      console.log('dynamicPricing event', boolean);
      this.dynamicPricing = boolean;
    })
  }

  populateSubCategory(category: ICategory) {
    if (category.hasOwnProperty('subCategory') && category.subCategory) {
      this.subCategories = category.subCategory;
      this.showSubCategory = true;
    } else {
      this.showSubCategory = false;
    }
  }

  public addItem(form: NgForm) {
    this.isWorking = true;

    this.events.subscribe('uploading:cancelled', () => {
      this.isWorking = false;
      this.events.unsubscribe('uploading:cancelled');
    });

    this.events.subscribe('uploaded:image', ({ imageName, imageUrl }) => {
      this.expCollRef
        .add({
          price: this.expense.price,
          note: this.expense.note,
          category: this.expense.category,
          subCategory: this.showSubCategory ? this.selectedSubCategory : null,
          date: new Date(this.expense.date),
          imageName,
          imageUrl
        })
        .then(docRef => {
          this.resetFields();
          this.isWorking = false;
          this.expCollRef.doc(docRef.id).update({
            id: docRef.id
          });

          this.events.unsubscribe('uploaded:image');
        })
        .catch(err => {
          this.isWorking = false;
          console.log(err);
          this.events.unsubscribe('uploaded:image');
        });
    });

    //Ideally we should pulish upload:image event and than a image upload
    // should happen and then listen for uploaded:image but in the case
    // when there is no image than every thing happens so fast the image upload
    // component publishes before home component have enough time to subscribe
    // to uploaded:image so event is missed
    this.events.publish('upload:image');
  }

  public update(expense: Expense) {
    this.expCollRef
      .doc(expense.id)
      .update({
        productName: 'changed Name',
        productDescription: 'changed Description'
      })
      .then(value => {
        console.log(value);
      })
      .catch(err => console.log(err));
  }

  public delete(item: Expense) {
    // this.expCollRef.doc('yourid').delete();
    const confirm = this.alertCtrl.create({
      subTitle: 'Do you really want to delete',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Yes',
          handler: () => {

            this.expCollRef.doc(item.id).delete();
            //FIXME: Refactor this subscription
            if(!item.imageName) return;
            this.storage
              .ref(`receipts/${item.imageName}`)
              .delete()
              .subscribe(
                resp => {
                  console.log('resource deleted', resp);
                },
                error => console.log(error)
              );
          }
        }
      ]
    });
    confirm.present();
  }

  public search() {
    this.navCtrl.push('SearchPage');
  }

  public calculate() {
    if (!this.expense.price) return;

    const price = this.expense.price.toString().split('+');
    // convert string to numbers
    const numberPrice = price.map(item => {
      return parseFloat(item);
    });

    // calculate prices
    this.expense.price = numberPrice.reduce((prev, item) => {
      return prev + Number(item);
    }, 0);
  }

  resetFields() {
    this.expense.price = null;
    this.expense.note = '';
  }

  public addDay() {
    let tempDate = this.expense.date;
    let nextDay = addDays(tempDate, 1);

    if (isAfter(nextDay, new Date())) return;
    this.expenseDate.setValue(nextDay.toISOString());
  }

  public subtractDay() {
    console.log('subractday');

    let tempDate = this.expense.date;
    this.expenseDate.setValue(subDays(tempDate, 1).toISOString());
    console.log(this.expense.date);
  }

  ngOnDestroy(){
    // (this.subscriptions) && this.subscriptions.unsubscribe();
  }
}
