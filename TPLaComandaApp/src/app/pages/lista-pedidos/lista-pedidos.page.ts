import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Pedido } from 'src/app/models/pedido-model';
import { PedidosService } from '../../services/pedido.service';
import { EmpleadoService } from '../../services/empleado.service';
import { PedidoDetalle } from '../../models/pedido-detalle-model';
import { ConceptosService } from 'src/app/services/concepto.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {

  cantPedidos: number;
  showPedido: boolean;

  constructor(
    private navCtrl: NavController,
    public pedidosService: PedidosService,
    public empleadoService: EmpleadoService,
    private conceptosService: ConceptosService
  ) {
    this.showPedido = true;
    console.log(this.showPedido);
  }

  ngOnInit() {
    this.cargarListaDetallePedidos();
  }

  mostrarDetalle(detalle: PedidoDetalle) {
    this.pedidosService.pedidoDetalle = detalle;
    this.conceptosService.getConcepto(detalle.conceptoDocID)
    .subscribe((data) => {
      this.conceptosService.concepto = data.payload.data();
    });
    this.pedidosService.getPedido(detalle.pedidoDocID)
    .subscribe((data: any) => {
      this.pedidosService.pedido = data.payload.data();
      this.pedidosService.pedido.docID = detalle.pedidoDocID;
    });
    setTimeout(() => {
      this.navCtrl.navigateRoot(`/estado-pedido`);
    }, 700);
  }

  mostrarPedido(pedido) {
    this.pedidosService.pedido = pedido;
    setTimeout(() => {
      this.navCtrl.navigateRoot(`/estado-pedido-cliente`);
    }, 700);
  }

  cargarListaDetallePedidos() {
    this.pedidosService.getPedidos()
    .subscribe((snap) => {
      this.pedidosService.pedidos = [];
      this.pedidosService.PedidosDetalle = [];
      snap.forEach(async (data: any) => {
        let pedido: Pedido = new Pedido();
        pedido = data.payload.doc.data();
        pedido.docID = data.payload.doc.id;
        this.ingresarPedido(pedido);
      });
      console.log(this.pedidosService.pedidos);
      console.log(this.pedidosService.PedidosDetalle);
    });
  }

  ingresarPedido(pedido: Pedido) {
    if (this.empleadoService.tipo === 'cocinero' && pedido.estado !== 'Confirmar') {
      pedido.detallePedido.forEach((detalle: PedidoDetalle) => {
        if ((detalle.conceptoCategoria === 'plato' ||
        detalle.conceptoCategoria === 'postre') &&
        (detalle.estado === 'Pendiente' || detalle.estado === 'Preparando')){
          detalle.pedidoDocID = pedido.docID;
          this.pedidosService.PedidosDetalle.push(detalle);
        }
      });
    }
    if (this.empleadoService.tipo === 'bar tender' && pedido.estado !== 'Confirmar') {
      pedido.detallePedido.forEach((detalle: PedidoDetalle) => {
        if (detalle.conceptoCategoria === 'bebidas' &&
        (detalle.estado === 'Pendiente' || detalle.estado === 'Preparando')){
          detalle.pedidoDocID = pedido.docID;
          this.pedidosService.PedidosDetalle.push(detalle);
        }
      });
    }

    if (this.empleadoService.tipo === 'mozo') {
      pedido.detallePedido.forEach((detalle: PedidoDetalle) => {
        if (detalle.estado === 'Listo para servir'){
          detalle.pedidoDocID = pedido.docID;
          this.pedidosService.PedidosDetalle.push(detalle);
        }
      });
    }
    if (this.empleadoService.tipo === 'mozo' && pedido.estado === 'Confirmar') {
      if (pedido.estado === 'Confirmar'){
        this.pedidosService.pedidos.push(pedido);
      }
    }
  }

}
