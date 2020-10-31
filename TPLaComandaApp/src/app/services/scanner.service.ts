import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private barcodeScanner: BarcodeScanner) { }



  async scannerMesa(){
    this.barcodeScanner.scan().then(async barcodeData => {
      if (!barcodeData.cancelled) {
        return barcodeData.text;
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
