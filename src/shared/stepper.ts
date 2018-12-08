import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";
import isAfter from "date-fns/is_after";
import { DateTime } from "ionic-angular";

export class Stepper {

  constructor(){
  }

  addMonth(date, element:DateTime){
    let nextMonth = addMonths(date, 1);
    if(isAfter(nextMonth, new Date())) return;
    element.setValue(nextMonth.toISOString());
  }
  
  subMonth(date, element:DateTime){
    element.setValue(subMonths(date, 1).toISOString());
    
  }

}