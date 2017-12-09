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

  expRef: AngularFirestoreCollection<any>;
  expenses$: Observable<Expense[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.expRef = this.afs.collection('expense', ref => ref.where('category','==','Food'));    
    this.expenses$ = this.expRef.valueChanges();
    console.log('ionViewDidLoad SearchPage');
  }

}
