import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../home/expense.model';
import { startOfMonth, endOfMonth } from 'date-fns';
import { groupBy, forIn, reduce } from 'lodash';
import { PieComponent } from '../../components/pie/pie';
import { Stepper } from '../../shared/stepper';

@IonicPage()
@Component({
  selector: 'page-summary-chart',
  templateUrl: 'summary-chart.html'
})
export class SummaryChartPage extends Stepper {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  loading: boolean = true;
  month = new Date().toISOString();
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
    super();
  }
  
  ionViewDidLoad() {
    this.loadBasic();
  }

  loadBasic(){
    const basicStartMonth = startOfMonth(this.month);
    const basicEndMonth = endOfMonth(this.month);

    this.loading = true;
    this.expRef = this.afs.collection('expense', ref =>
      ref
        .where('date', '>=', basicStartMonth)
        .where('date', '<=', basicEndMonth)
    );

    // Finding Total
    this.expenses$ = this.expRef.valueChanges();
    this.expenses$.forEach(values => {
      this.generateDataForChart(values);
    });
  }

  generateDataForChart(values) {
   
    let chartData = []
    let chartLabels = [];
    let grouped;
    console.log({values});

    // Previously for format like {category:'food'}
    // grouped = lodash.groupBy(values, ('category.title'));

    // Backward compat becuse new format is {category:{title:'food'}}
    grouped = groupBy(values, (item)=>{return item.category.title ? item.category.title : item.category});
    console.log({grouped});
    
    forIn(grouped, (value, key, item) => {
      chartLabels.push(key.toUpperCase());
      chartData.push(reduce(
        value,(sum, n) => {
          return sum + Number(n.price);
        },0))
    });

    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(PieComponent);
    const componentRef = this.container.createComponent(factory);

    console.log(chartLabels);
    

    componentRef.instance.doughnutChartData = chartData;
    componentRef.instance.doughnutChartLabels = chartLabels;
    // componentRef.instance.chartClicked.subscribe((event, item) => {
    //   console.log(event);
    //   console.log(item);
      
    // })
  }
}
