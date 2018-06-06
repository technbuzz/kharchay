import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../home/expense.model';
import { startOfMonth, endOfMonth } from 'date-fns';
import * as lodash from 'lodash';
import { BaseChartDirective } from 'ng2-charts';
import { PieComponent } from '../../components/pie/pie';

@IonicPage()
@Component({
  selector: 'page-summary-chart',
  templateUrl: 'summary-chart.html'
})
export class SummaryChartPage {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  loading: boolean = true;
  expRef: AngularFirestoreCollection<any>;
  expenses$: Observable<Expense[]>;

  doughnutChartLabels = [];
  doughnutChartData = []

  total: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private resolver: ComponentFactoryResolver
  ) {
  }
  
  ionViewDidLoad() {
    // console.log('this container', this.container);
    

    
    this.getCurrentMonthStats();
  }

  getCurrentMonthStats() {
    const basicStartMonth = startOfMonth(new Date());
    const basicEndMonth = endOfMonth(new Date());

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
      this.generateDataForChart(values);
    });
    this.loading = false;
  }

  generateDataForChart(values) {
   
    let chartData = []
    let chartLabels = [];

    const grouped = lodash.groupBy(values, 'category');
    lodash.forIn(grouped, (value, key, item) => {
      chartData.push(lodash.reduce(
          value,(sum, n) => {
            return sum + Number(n.price);
          },0))
    });

    const factory = this.resolver.resolveComponentFactory(PieComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.doughnutChartData = chartData;
    
  }

  chartHovered() {}

  chartClicked() {}
}
