import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-scanner-solicitar-mesa',
  templateUrl: './scanner-solicitar-mesa.page.html',
  styleUrls: ['./scanner-solicitar-mesa.page.scss'],
})
export class ScannerSolicitarMesaPage implements OnInit {

  estaEnEspera: boolean = false;
  errorCodigo: boolean = false;
  // usuarioActual;  //si necesita guardar algun dato del usuario
  idUsuarioActual: string;
  nombreUserActual: string;
  // idElementoAgregado: string;
  constructor(private barcodeScanner: BarcodeScanner,
              private cloud: CloudFirestoreService,
              private auth: AuthService,
              private db: AngularFirestore,
              private router: Router) { }

  async ngOnInit() {
    this.auth.ObtenerActual().subscribe(rta=>{
      this.idUsuarioActual = rta.id;
      this.nombreUserActual = rta.get("nombre");    
      this.db.collection("listaEspera").doc(this.idUsuarioActual).snapshotChanges().subscribe(snap=>{
        if(snap.payload.exists){
          this.estaEnEspera = true;
        }
        else{
          this.estaEnEspera = false;
        }
      })
    });    
  }

  async scanner(){
    this.barcodeScanner.scan().then(async barcodeData => {
      if (!barcodeData.cancelled) {        
        this.VerificarScan(barcodeData.text);        
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  VerificarScan(codigo: string){
    this.errorCodigo = false;
    if(codigo == "solicitar_mesa"){
      let elementoAgregar = {
        nombre: this.nombreUserActual,
      };
      this.cloud.AgregarConId("listaEspera", this.idUsuarioActual, elementoAgregar);
      this.estaEnEspera = true;
    }
    else{
      this.errorCodigo = true;
    }
  }

  Cancelar(){
    this.cloud.Borrar("listaEspera", this.idUsuarioActual);
    this.router.navigate(['home']);
  }

  Volver(){
    this.router.navigate(['home']);
  }
}
