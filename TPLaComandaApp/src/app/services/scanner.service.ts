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
        console.log(`---${barcodeData.text}-----`);
        // logica para saber si tiene la mesa asignada
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
