import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Expense } from "./expense.model";
import { categories } from "../../shared/categories";
import { firestore } from 'firebase/app';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  

  expense = {
    price: '',
    note: '',
    category: '',
    date: new Date().toISOString()
  };

  total:number = 0;
  isWorking: boolean = false;
  cdo = new Date();
  maxDate: string;
  categories = [];
  expCollRef: AngularFirestoreCollection<any> = this.afs.collection('expense', ref => ref.orderBy('date','desc'));
  expenses: Observable<Expense[]>;
  
  constructor(public navCtrl: NavController, public afs: AngularFirestore) {
    Object.assign(this.categories, categories);
  }
  
  ngOnInit(): void {

    this.expenses = this.expCollRef.valueChanges(); 

    this.expenses.forEach(values => {
      this.total = values.reduce((prev, current, ) => {
        return prev + Number(current.price);
      }, 0)
    });
  }

  ionViewDidLoad(){
    this.maxDate = `${this.cdo.getFullYear()}-${this.padded(this.cdo.getMonth()+1)}-${this.padded(this.cdo.getDate())}`
    
  }

  public addItem(form:NgForm){ 
    this.isWorking = true;
    this.expCollRef.add({
      price: this.expense.price,
      note: this.expense.note,
      category: this.expense.category,
      date: new Date(this.expense.date)
    }).then((docRef)=>{
      form.reset();
      this.isWorking = false;
      this.expCollRef.doc(docRef.id).update({
        id: docRef.id
      })      
    }).catch((err)=>{
      this.isWorking = false;
      console.log(err);
    })
  }

  private padded(value:number){
    let input = value.toString();
    return (input.length < 2) ? `0${value}` : value;
  }

  public update(expense: Expense){
    this.expCollRef.doc(expense.id).update({
      productName: 'changed Name',
      productDescription: 'changed Description'
    }).then((value) => {
      console.log(value);
    }).catch(err => console.log(err))
  }

  public delete(){
    this.expCollRef.doc('yourid').delete();
  }

  public search(){
    this.navCtrl.push('SearchPage')
  }

}
