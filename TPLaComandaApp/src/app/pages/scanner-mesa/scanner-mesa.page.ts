import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ScannerService } from '../../services/scanner.service';
import { ConceptosService } from '../../services/concepto.service';
import { PedidosService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido-model';

@Component({
  selector: 'app-scanner-mesa',
  templateUrl: './scanner-mesa.page.html',
  styleUrls: ['./scanner-mesa.page.scss'],
})
export class ScannerMesaPage implements OnInit {

  optionsSlide = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private navCtrl: NavController,
    private scannerMesaService: ScannerService,
    private conceptosService: ConceptosService,
    private pedidosService: PedidosService
    ) { }

  ngOnInit() {
    // disparar qr
    this.cargarMenu();
    this.navCtrl.navigateRoot('/pedido');
  }

  async scannerMesa() {
    // llamo al servicio
    const result = await this.scannerMesaService.scannerMesa();
    this.cargarMenu();
    this.navCtrl.navigateRoot('/pedido');
  }

  volver() {
    this.navCtrl.navigateRoot('/home');
  }

  async cargarMenu() {
    this.pedidosService.pedido = new Pedido();
    this.conceptosService.conceptos = [];
    await this.conceptosService.getConceptos()
    .subscribe((snap) => {
      snap.forEach(async (data: any) => {
        const concepto = data.payload.doc.data();
        concepto.docID = data.payload.doc.id;
        this.conceptosService.conceptos.push(concepto);
      });
    });
  }


}
