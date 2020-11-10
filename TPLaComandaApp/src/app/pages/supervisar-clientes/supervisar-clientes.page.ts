import { Component, OnInit } from '@angular/core';
import { SupervisarClientesService } from '../../services/supervisar-clientes.service';
import { IClienteASupervisarUID } from '../../clases/usuario';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-supervisar-clientes',
  templateUrl: './supervisar-clientes.page.html',
  styleUrls: ['./supervisar-clientes.page.scss'],
})
export class SupervisarClientesPage implements OnInit {
  listaClientes: Observable<IClienteASupervisarUID[]>;

  constructor(
    private supervisarClientesService: SupervisarClientesService
  ) {
    this.listaClientes = this.supervisarClientesService.getListaClientes();
   }

  ngOnInit() {
  }

  public cambiarEstado(cliente: IClienteASupervisarUID, nuevoEstado: string){
    this.supervisarClientesService.cambiarEstado(cliente, nuevoEstado);
  }
}
