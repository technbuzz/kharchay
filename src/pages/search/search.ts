import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../home/expense.model';
import { categories } from "../../shared/categories";

@IonicPage({})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  
  categories: any = [];
  category;

  searchDate;
  expRef: AngularFirestoreCollection<any>;
  expenses$: Observable<Expense[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    Object.assign(this.categories, categories);
  }

  ionViewDidLoad() {
  }
  
  public loadResults(){
    console.log('Loading Data');
    
    this.expRef = this.afs.collection('expense', ref => ref.where('category','==', this.category));     
    this.expenses$ = this.expRef.valueChanges();

  }

}
