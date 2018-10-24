import { Component } from '@angular/core';
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: 'expense-image',
  templateUrl: 'expense-image.html'
})
export class ExpenseImageComponent {
  selectedFiles: FileList;
  file:File;
  imgsrc;

  chooseFile(event){
    this.selectedFiles = event.target.files;
    if(this.selectedFiles.item(0)){
      this.uploadPic();
    }
  }

  uploadPic(){
    const file = this.selectedFiles.item(0);
    const uniqueKey = `pic${Math.floor(Math.random() * 10000)}`
    const uploadTask = this.storage.upload(`/receipts/${uniqueKey}`, file);

    this.imgsrc = uploadTask.downloadURL();
  }

  constructor(private storage: AngularFireStorage) {}

}
