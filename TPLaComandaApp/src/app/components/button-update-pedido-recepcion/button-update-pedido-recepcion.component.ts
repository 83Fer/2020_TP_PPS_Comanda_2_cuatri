import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedido.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { ToastService } from 'src/app/services/ui-service.service';
import { HomeMesasService } from '../../services/home-mesas.service';

@Component({
  selector: 'app-button-update-pedido-recepcion',
  templateUrl: './button-update-pedido-recepcion.component.html',
  styleUrls: ['./button-update-pedido-recepcion.component.scss'],
})
export class ButtonUpdatePedidoRecepcionComponent implements OnInit {

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
    private navCtrl: NavController,
    private homeMesasService: HomeMesasService,
    private pushNotificationService: PushNotificationService
  ) { }

  ngOnInit() {}

  async btnSi() {
    this.update('Recibió el pedido');
  }

  async btnNo() {
    // Falta funcionalidad
  }

  async update(estado) {
    const docID = this.pedidosService.pedido.docID;

    console.log(this.pedidosService.pedido);

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
      this.toastService.presentToast( 'Cuando guste puede pedir la cuenta.' );

      this.homeMesasService.pedidoConfirmado = true;
      this.homeMesasService.getMenuMesas();
      this.navCtrl.navigateRoot(`/home-mesas`);
    } else {
      this.toastService.presentToast( 'Error al actualizar pedido.' );
    }

  }


}
