import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedido.service';
import { ToastService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-button-update-pedido-confirm',
  templateUrl: './button-update-pedido-confirm.component.html',
  styleUrls: ['./button-update-pedido-confirm.component.scss'],
})
export class ButtonUpdatePedidoConfirmComponent implements OnInit {

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

  async aceptar() {
    this.update('Preparando');
  }

  async rechazar() {
    this.update('Rechazado');
  }

  async update(estado) {
    const docID = this.pedidosService.pedido.docID;

    this.pedido.usuarioDocID = this.pedidosService.pedido.usuarioDocID;
    this.pedido.usuarioNombre = this.pedidosService.pedido.usuarioNombre;
    this.pedido.mesaDocID = this.pedidosService.pedido.mesaDocID;
    this.pedido.mesaNro = this.pedidosService.pedido.mesaNro;
    this.pedido.fechaInicio = this.pedidosService.pedido.fechaInicio;
    this.pedido.fechaFin = '';
    this.pedido.estado = estado;
    this.pedido.importeTotal = this.pedidosService.pedido.importeTotal;

    this.pedido.detallePedido = this.pedidosService.pedido.detallePedido.map((obj) =>
    {
      return Object.assign({}, obj);
    });

    const modificado = await this.pedidosService.updatePedido(docID, this.pedido);

    if (modificado) {
      estado === 'Rechazado' ? this.toastService.presentToast( 'Pedido rechazado.' ) :
      this.toastService.presentToast( 'Pedido aceptado.' );
      this.navCtrl.navigateRoot(`/lista-pedidos`);
    } else {
      this.toastService.presentToast( 'Error al actualizar pedido.' );
    }

  }

}
