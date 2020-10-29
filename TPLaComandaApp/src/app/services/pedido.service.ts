import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Pedido } from '../models/pedido-model';
import { PedidoDetalle } from '../models/pedido-detalle-model';
import { ToastService } from './ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  titulo: string;

  pedidos: Pedido[] = [];
  pedido: Pedido;
  totalPedido: number;

  constructor(
    private afs: AngularFirestore,
    private toastService: ToastService
    ) { }

  getPedidos() {
    return this.afs.collection('pedidos').snapshotChanges();
  }

  createPedido(pedido) {
    return new Promise( resolve => {
        this.afs.collection('pedidos').add(pedido);
        resolve(true);
    });
  }

  public updatePedido(documentId: string, data: any) {
    return this.afs.collection('pedidos').doc(documentId).set(data);
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
