import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/ui-service.service';
import { PedidosService } from '../../services/pedido.service';

@Component({
  selector: 'app-button-update-estado-pedido',
  templateUrl: './button-update-estado-pedido.component.html',
  styleUrls: ['./button-update-estado-pedido.component.scss'],
})
export class ButtonUpdateEstadoPedidoComponent implements OnInit {

  pedido = {
    usuarioDocID: '',
    usuarioNombre: '',
    mesaDocID: '',
    mesaNro: '',
    fechaInicio: '',
    fechaFin: '',
    estado: '',
    importeTotal: '',
    detallePedido: []
  };

  constructor(
    private pedidosService: PedidosService,
    private toastService: ToastService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  async update() {
    const docID = this.pedidosService.pedido.docID;

    this.pedido.usuarioDocID = this.pedidosService.pedido.usuarioDocID;
    this.pedido.usuarioNombre = this.pedidosService.pedido.usuarioNombre;
    this.pedido.mesaDocID = this.pedidosService.pedido.mesaDocID;
    this.pedido.mesaNro = this.pedidosService.pedido.mesaNro;
    this.pedido.fechaInicio = this.pedidosService.pedido.fechaInicio;
    this.pedido.fechaFin = '';
    this.pedido.estado = this.pedidosService.pedido.estado;
    this.pedido.importeTotal = this.pedidosService.pedido.importeTotal;

    for (const iterator of this.pedidosService.pedido.detallePedido) {
      if (this.pedidosService.pedidoDetalle.conceptoDocID === iterator.conceptoDocID){
        this.pedido.detallePedido.push(this.pedidosService.pedidoDetalle);
      } else {
        this.pedido.detallePedido.push(iterator);
      }
    }

    const modificado = await this.pedidosService.updatePedido(docID, this.pedido);

    if (modificado) {
      this.toastService.presentToast( 'Pedido actualizado.' );
      this.navCtrl.navigateRoot(`/lista-pedidos`);
    } else {
      this.toastService.presentToast( 'Error al actualizar pedido.' );
    }

  }

}