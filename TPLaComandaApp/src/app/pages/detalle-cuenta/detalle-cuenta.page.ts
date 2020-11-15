import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.page.html',
  styleUrls: ['./detalle-cuenta.page.scss'],
})
export class DetalleCuentaPage implements OnInit {

  idUserActual: string;
  listaPedidos: Array<any>;
  totalPagar: number;
  constructor(private cloud: CloudFirestoreService, private auth: AuthService) { }

  async ngOnInit() {
    this.idUserActual = this.auth.getUIDUserLoggeado();
    // this.idUserActual = "12312";
    this.cloud.ObtenerTodosTiempoReal("pedidos").subscribe(snap=>{
      this.listaPedidos = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("usuarioDocID")==this.idUserActual){          
          let payload = rta.payload.doc;
          let detalle = payload.get("detallePedido")[0];
          let pedido = {
            total: payload.get("importeTotal"),
            producto: detalle.conceptoNombre,
            cantidad: detalle.cantidad,
            precioUnitario: detalle.importeUnitario,
          }
          this.listaPedidos.push(pedido);
        }
      });
      this.CalcularTotalPagar();
    })
  }

  CalcularTotalPagar(){
    this.totalPagar = 0;
    this.listaPedidos.forEach(pedido=>{
      this.totalPagar+=parseFloat(pedido.total);
    })
  }

  Volver(){
    //  TODO
  }
}
