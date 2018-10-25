import { Component } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Events, Loading } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'expense-image',
  templateUrl: 'expense-image.html'
})
export class ExpenseImageComponent {
  selectedFiles: FileList;
  file: File;
  imgsrc;
  subscriptions;
  loader: Loading;

  chooseFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPic() {
    if (this.selectedFiles.item(0)) {
      const file = this.selectedFiles.item(0);
      const uniqueKey = `pic${Math.floor(Math.random() * 10000)}`;
      const uploadTask = this.storage.upload(`/receipts/${uniqueKey}`, file);

      //FIXME: refactor subscription
      uploadTask.downloadURL().subscribe(resp => {
        this.imgsrc = resp;
        this.events.publish('uploaded:image', {imageName: uniqueKey, imageUrl: resp});
        this.loader.dismiss().then(x => this.nullify());
      });
    }
  }

  constructor(
    private storage: AngularFireStorage,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    //FIXME: refactor subscription
    this.events.subscribe('upload:image', () => {
      this.loader = this.loadingCtrl.create({
        content: 'Uploading Image, Please wait...'
      });
      this.loader.present();
      this.uploadPic();
    });
  }

  nullify() {
    this.selectedFiles = null;
    this.imgsrc = '';
  }
}
