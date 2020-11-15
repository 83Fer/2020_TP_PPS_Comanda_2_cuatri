import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConceptosService } from 'src/app/services/concepto.service';
import { PedidosService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-estado-pedido-cliente-confirma',
  templateUrl: './estado-pedido-cliente-confirma.page.html',
  styleUrls: ['./estado-pedido-cliente-confirma.page.scss'],
})
export class EstadoPedidoClienteConfirmaPage implements OnInit {

  previousurl: string;

  constructor(
    public conceptosService: ConceptosService,
    public pedidosService: PedidosService,
    private router: Router
  ) {
    this.previousurl = router['transitions'].value.currentSnapshot.url;
  }

  ngOnInit() {
  }

}
