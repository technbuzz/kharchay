import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Expense } from "./expense.model";
import { categories } from "../../shared/categories";
import { firestore } from 'firebase/app';
import { NgForm } from '@angular/forms';

import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import isAfter from 'date-fns/is_after';
import startOfMonth from 'date-fns/start_of_month';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  @ViewChild('expenseDate') expenseDate: DateTime;
  cdo = new Date();
  currentMonth = format(new Date(), 'MMMM');
  startOfMonth = startOfMonth(this.cdo);
  expense = {
    price: '',
    note: '',
    category: '',
    date: new Date().toISOString()
  };

  total:number = 0;
  isWorking: boolean = false;
  maxDate: string;
  categories = [];
  expCollRef: AngularFirestoreCollection<any> = this.afs
    .collection('expense', ref => ref.orderBy('date','desc')
    .where("date",">=",this.startOfMonth)
  );
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
    this.maxDate = this.cdo.toISOString().split('T')[0];    
  }

  public addItem(form:NgForm){ 
    this.isWorking = true;
    this.expCollRef.add({
      price: this.expense.price,
      note: this.expense.note,
      category: this.expense.category,
      date: new Date(this.expense.date)
    }).then((docRef)=>{
      this.resetFields();
      this.isWorking = false;
      this.expCollRef.doc(docRef.id).update({
        id: docRef.id
      })      
    }).catch((err)=>{
      this.isWorking = false;
      console.log(err);
    })
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

  resetFields(){
    this.expense.price = '';
    this.expense.note = '';
  }

  public addDay(){

    let tempDate = this.expense.date;
    let nextDay = addDays(tempDate, 1);
    
    if(isAfter(nextDay, new Date())) return;
    this.expenseDate.setValue(addDays(tempDate, 1).toISOString());
    
  }
  
  public subtractDay(){
    console.log('subractday');
    
    let tempDate = this.expense.date;
    this.expenseDate.setValue(subDays(tempDate, 1).toISOString());
    console.log(this.expense.date);
    
  }

}
