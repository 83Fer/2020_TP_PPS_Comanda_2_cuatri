import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Pedido } from '../models/pedido-model';
import { PedidoDetalle } from '../models/pedido-detalle-model';
import { ToastService } from './ui-service.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  titulo: string;

  pedidos: Pedido[] = [];
  pedido: Pedido;
  PedidosDetalle: PedidoDetalle[] = [];
  pedidoDetalle: PedidoDetalle;
  totalPedido: number;

  // crear propiedades para user

  constructor(
    private ngFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastService: ToastService
    ) { }

  getPedidos() {
    return this.afs.collection('pedidos').snapshotChanges();
  }

  getPedido(id) {
    return this.afs.collection('pedidos').doc(id).snapshotChanges();
  }

  createPedido(pedido) {
    return new Promise( resolve => {
        this.afs.collection('pedidos').add(pedido);
        resolve(true);
    });
  }

  public updatePedido(documentId: string, data: any) {
    return new Promise( resolve => {
      this.afs.collection('pedidos').doc(documentId).set(data);
      resolve(true);
    });
  }

  AddDetallePedido(detalle: PedidoDetalle) {
    if (this.pedido.detallePedido.length > 0  ) {
      for (const item of this.pedido.detallePedido) {
        if (item.conceptoDocID === detalle.conceptoDocID) {
          this.toastService.presentToast( 'El producto ya fue agregado a la orden.' );
          return;
        }
      }
    }
    this.pedido.detallePedido.push(detalle);
    this.sumarPedido();
  }

  sumarPedido() {
    this.totalPedido = 0;
    for (const item of this.pedido.detallePedido) {
      this.totalPedido = this.totalPedido + +item.importeTotal;
    }
  }

}
