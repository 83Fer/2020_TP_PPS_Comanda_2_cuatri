import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedido.service';
import { ToastService } from '../../services/ui-service.service';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-button-create-pedido',
  templateUrl: './button-create-pedido.component.html',
  styleUrls: ['./button-create-pedido.component.scss'],
})
export class ButtonCreatePedidoComponent implements OnInit {

  pedido = {
    usuarioDocID: '',
    usuarioNombre: '',
    mesaDocID: '',
    mesaNro: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Confirmar',
    importeTotal: '',
    detallePedido: []
  };

  constructor(
    private ngFireAuth: AngularFireAuth,
    private toastService: ToastService,
    public pedidosService: PedidosService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async enviarPedido() {
    this.pedido.usuarioDocID = this.ngFireAuth.auth.currentUser.uid;
    this.pedido.usuarioNombre = 'Juan';
    this.pedido.mesaDocID = '23';
    this.pedido.mesaNro = '1';
    this.pedido.fechaInicio = new Date().toTimeString();
    this.pedido.fechaFin = '';
    this.pedido.estado = 'Confirmar';
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
