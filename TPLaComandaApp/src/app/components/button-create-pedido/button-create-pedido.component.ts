import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedido.service';
import { ToastService } from '../../services/ui-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-button-create-pedido',
  templateUrl: './button-create-pedido.component.html',
  styleUrls: ['./button-create-pedido.component.scss'],
})
export class ButtonCreatePedidoComponent implements OnInit {

  pedido = {
    usuarioDocID: '',
    mesaDocID: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'activo',
    importeTotal: '',
    detallePedido: []
  };

  constructor(
    private toastService: ToastService,
    public pedidosService: PedidosService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async enviarPedido() {
    this.pedido.usuarioDocID = '12312';
    this.pedido.mesaDocID = '23';
    this.pedido.fechaInicio = new Date().toTimeString();
    this.pedido.fechaFin = '';
    this.pedido.estado = 'activo';
    this.pedido.importeTotal = this.pedidosService.totalPedido.toString();

    this.pedido.detallePedido = this.pedidosService.pedido.detallePedido.map((obj) =>
                    {
                      return Object.assign({}, obj);
                    });



    const creado = await this.pedidosService.createPedido(this.pedido);

    if (creado) {
      this.toastService.presentToast( 'Orden enviada.' );
      this.navCtrl.navigateRoot(`/home`);
    } else {
      this.toastService.presentToast( 'Error al enviar la orden.' );
    }
  }

}
