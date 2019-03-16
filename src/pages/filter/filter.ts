import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, ToastController } from 'ionic-angular';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../home/expense.model';
import { categories } from '../../shared/categories';
import { startOfMonth, endOfMonth, isBefore } from 'date-fns';
import { Stepper } from '../../shared/stepper';

@IonicPage({})
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage extends Stepper {
  @ViewChild(DateTime) expenseMonth: DateTime;
  categories: any = [];
  searchType: string = 'basic';
  filter = {
    startDate: '',
    endDate: '',
    category: '',
    month: new Date().toISOString()
  };

  basic: string = '';

  expRef: AngularFirestoreCollection<any>;
  expenses$: Observable<Expense[]>;

  total: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore,
    public toastCtrl: ToastController
  ) {
    super();
    Object.assign(this.categories, categories);
  }

  ionViewDidLoad() {
    // this.addMonth();
    this.loadBasic();
  }

  public loadBasic() {
    const basicStartMonth = startOfMonth(this.filter.month);
    const basicEndMonth = endOfMonth(this.filter.month);

    this.loadResults({startDate: basicStartMonth.toISOString(), endDate: basicEndMonth.toISOString()})

    this.expRef = this.afs.collection('expense', ref =>
      ref
        .where('date', '>=', basicStartMonth)
        .where('date', '<=', basicEndMonth)
    );

    // Finding Total
    this.findTotal();
  }

  public loadResults({startDate, endDate}) {
    if(startDate && endDate) {
      this.filter.startDate = startDate;
      this.filter.endDate = endDate;
    }

    if(!this.filter.startDate || !this.filter.endDate || !this.filter.category){
      return
    }

    if(isBefore(this.filter.endDate, this.filter.startDate)){
      
      this.toastCtrl.create({
        message: 'Note: Start Date cannot be set in the future.',
        position: 'bottom',
        showCloseButton: true
      }).present();

      return
    }

    this.expRef = this.afs.collection('expense', ref =>
      ref
        .where('date', '>=', new Date(this.filter.startDate))
        .where('date', '<=', new Date(this.filter.endDate))
        .where('category', '==', this.filter.category)
    );

    // Finding Total
    this.findTotal();
  }
  
  findTotal(){
    this.expenses$ = this.expRef.valueChanges();
    this.expenses$.forEach(values => {
      this.total = values.reduce((prev, current) => {
        return prev + Number(current.price);
      }, 0);
    })
  }
}
