import { Component, OnInit } from '@angular/core';
import { SupervisarClientesService } from '../../services/supervisar-clientes.service';
import { IClienteASupervisarUID } from '../../clases/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisar-clientes',
  templateUrl: './supervisar-clientes.page.html',
  styleUrls: ['./supervisar-clientes.page.scss'],
})
export class SupervisarClientesPage implements OnInit {
  listaClientes: Observable<IClienteASupervisarUID[]>;

  constructor(
    private supervisarClientesService: SupervisarClientesService,
    private router: Router
  ) {
    this.listaClientes = this.supervisarClientesService.getListaClientes();
   }

  ngOnInit() {
  }

  public cambiarEstado(cliente: IClienteASupervisarUID, nuevoEstado: string){
    this.supervisarClientesService.cambiarEstado(cliente, nuevoEstado);
  }

  public irAtras(){
    this.router.navigateByUrl("/home");
  }
}
