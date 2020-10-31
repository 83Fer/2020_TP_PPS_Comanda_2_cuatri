import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
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
  usuarioActual;  //si necesita guardar algun dato del usuario
  idUsuarioActual: string;
  idElementoAgregado: string;
  constructor(private barcodeScanner: BarcodeScanner,
              private cloud: CloudFirestoreService,
              private auth: AuthService,
              private router: Router) { }

  async ngOnInit() {
    this.auth.ObtenerActual().subscribe(rta=>{
      // this.usuarioActual = rta.data(); si necesita algun dato guardar de aca
      this.idUsuarioActual = rta.id;
    })
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
    //  TODO agregar qr a firebase?
    if(codigo == "solicitar_mesa"){
      let elementoAgregar = {
        id_cliente: this.idUsuarioActual
      };
      this.cloud.AgregarSinId("lista_espera", elementoAgregar).then(rta=>{
        this.idElementoAgregado = rta.id;
      })
      this.estaEnEspera = true;
    }
  }

  Cancelar(){
    this.cloud.Borrar("lista_espera", this.idElementoAgregado);
    this.router.navigate(['home']);
  }
}
