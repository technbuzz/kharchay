import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../home/expense.model';
import { startOfMonth, endOfMonth } from 'date-fns';

@IonicPage()
@Component({
  selector: 'page-summary-chart',
  templateUrl: 'summary-chart.html'
})
export class SummaryChartPage {
  loading: boolean = true;
  expRef: AngularFirestoreCollection<any>;
  expenses$: Observable<Expense[]>

  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales'
  ];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';
  donutOptions: any = {
    legend: {
      display: true,
      position: 'right',
      labels: {
        // fontColor: 'rgb(255, 99, 132)'
      }
    }
  };

  total:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryChartPage');
    this.getCurrentMonthStats();
  }

  getCurrentMonthStats(){
    const basicStartMonth = startOfMonth(new Date());
    const basicEndMonth = endOfMonth(new Date());

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
      console.log(values);
      
    });

  }

  chartHovered() {}

  chartClicked() {}
}
