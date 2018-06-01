import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../home/expense.model';
import { categories } from '../../shared/categories';

@IonicPage({})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  loading: boolean = false;
  categories: any = [];
  searchType: string = 'month';
  filter = {
    startDate: '',
    endDate: '',
    category: '',
    month: ''
  };

  expRef: AngularFirestoreCollection<any>;
  expenses$: Observable<Expense[]>;

  total: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore
  ) {
    Object.assign(this.categories, categories);
  }

  ionViewDidLoad() {}

  public loadResults() {
    console.log(this.filter);
    
    this.loading = true;
    this.expRef = this.afs.collection('expense', ref =>
      ref.where('category', '==', this.filter.category)
    );
    this.expenses$ = this.expRef.valueChanges();

    this.expenses$.forEach(values => {
      this.total = values.reduce((prev, current) => {
        return prev + Number(current.price);
      }, 0);
    });
    this.loading = false;
  }
}
