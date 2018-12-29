import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IExpense } from '../../shared/expense.interface';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'expense-item',
  template: `
    <ion-item-sliding >
      <ion-item no-padding [attr.detail-push]="item.imageName" [attr.text-wrap]="item.details ? true : null" (click)="showDetails(item)">
        <ion-avatar item-start *ngIf="item.imageUrl">
          <img src="./assets/imgs/placeholder.png">
        </ion-avatar>
        <h2>{{item.price}}</h2>
        <!-- For backward compatibility -->
        <ion-badge *ngIf="item.category.title else oldTitle">{{item.category.title}}</ion-badge>
        <ng-template #oldTitle>
          <ion-badge>{{item.category}}</ion-badge>
        </ng-template>
        <!-- END For backward compatibility -->

        <ion-badge *ngIf="item?.subCategory" color="danger">{{item?.subCategory}}</ion-badge>
        <p>{{item.note}}</p>
        <p item-end>{{item.date | date:"E, MMM d, y"}}</p>
      </ion-item>
      <ion-item-options slide="right" *ngIf="!readonly">
        <button ion-button color="danger" (click)="delete.emit(item)">Delete</button>
      </ion-item-options>

    </ion-item-sliding>
  `
})
export class ExpenseItemComponent{
  @Input('expense') item: IExpense;
  @Input() readonly: boolean = false;
  @Output('onDelete') delete = new EventEmitter();

  constructor(private navCtrl: NavController) {
  }
  
  public showDetails(item: IExpense) {
    if (item.imageName) {
      this.navCtrl.push('DetailsPage', { item });
    } else {
      item.details = !item.details;
    }
  }
}
