import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConceptosService } from '../../services/concepto.service';
import { PedidosService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  texto: '';
  listMenu: Array<any> = [];

  constructor(
    private navCtrl: NavController,
    public conceptosService: ConceptosService,
    public pedidosService: PedidosService
    ) { }

  async ngOnInit() {
    console.log(this.conceptosService.conceptos);
    setTimeout(() => {
      const g = new Set(this.conceptosService.conceptos.map(i => i.seccion));
      console.log(g);
      g.forEach(x =>
        this.listMenu.push({
          name: this.conceptosService.conceptos.filter(i => i.seccion === x)[0].seccion,
          values: this.conceptosService.conceptos.filter(i => i.seccion === x)
        }
      ));
    }, 1500);
  }

  buscarMenu(event: any) {
    this.texto = event.detail.value;
  }

  conceptoDetails(docID) {
    this.conceptosService.getConcepto(docID)
    .subscribe((data) => {
      this.conceptosService.concepto = data.payload.data();
    });
    setTimeout(() => {
      this.navCtrl.navigateRoot(`/concepto/${docID}`);
    }, 700);
  }

  irAPedidos() {
    this.navCtrl.navigateRoot(`/orden`);
  }

}
