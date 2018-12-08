import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../home/expense.model';
import { categories } from '../../shared/categories';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Stepper } from '../../shared/stepper';

@IonicPage({})
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage extends Stepper {
  @ViewChild(DateTime) expenseMonth: DateTime;
  loading: boolean = false;
  categories: any = [];
  searchType: string = 'basic';
  filter = {
    startDate: '',
    endDate: '',
    category: '',
    month: new Date()
  };

  basic: string = '';

  expRef: AngularFirestoreCollection<any>;
  expenses$: Observable<Expense[]>;

  total: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore
  ) {
    super();
    Object.assign(this.categories, categories);
  }

  ionViewDidLoad() {
    // this.addMonth();
  }

  public loadBasic() {
    const basicStartMonth = startOfMonth(this.filter.month);
    const basicEndMonth = endOfMonth(this.filter.month);

    this.loading = true;
    this.expRef = this.afs.collection('expense', ref =>
      ref
        .where('date', '>=', basicStartMonth)
        .where('date', '<=', basicEndMonth)
    );

    // Finding Total
    this.expenses$ = this.expRef.valueChanges();
    this.expenses$.forEach(values => {
      this.total = values.reduce((prev, current) => {
        return prev + Number(current.price);
      }, 0);
    });
  }

  public loadResults() {
    if(!this.filter.startDate || !this.filter.endDate || !this.filter.category){
      return
    }

    this.loading = true;
    this.expRef = this.afs.collection('expense', ref =>
      ref
        .where('date', '>=', new Date(this.filter.startDate))
        .where('date', '<=', new Date(this.filter.endDate))
        .where('category', '==', this.filter.category)
    );

    // Finding Total
    this.expenses$ = this.expRef.valueChanges();
    this.expenses$.forEach(values => {
      this.total = values.reduce((prev, current) => {
        return prev + Number(current.price);
      }, 0);
    });
    this.loading = false;
  }
}
