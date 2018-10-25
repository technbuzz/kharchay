import { Component } from '@angular/core';
import { AngularFireStorage } from "angularfire2/storage";
import { Events } from 'ionic-angular';


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
  }

  uploadPic(){
    if(this.selectedFiles.item(0)){
      const file = this.selectedFiles.item(0);
    const uniqueKey = `pic${Math.floor(Math.random() * 10000)}`
    const uploadTask = this.storage.upload(`/receipts/${uniqueKey}`, file);

    uploadTask.downloadURL().subscribe(resp => {
      this.imgsrc = resp;
      console.log(resp);

      setTimeout(()=>{
        this.events.publish('uploaded:image', resp);
        console.log('[Event] Pulished upload image');
      },3000);
    })
    }
    
  }

  constructor(private storage: AngularFireStorage, public events: Events) {}

  ngOnInit(){
    this.events.subscribe('upload:image', ()=>{
      console.log('[Event] Upload Image received');
      setTimeout( ()=>{
        console.log('[Event] Pulishing upload image');
        this.uploadPic();
      },1500);



      
    })

  }

}
