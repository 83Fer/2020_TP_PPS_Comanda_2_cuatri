import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // propiedades provisoria
  solicitudAceptada = true;
  perfilAnonimo = true;
  tipoEmpleado = 'metre';

  // lista de botones del menu
  listaMenu: Menu[];

  private clienteCards: Menu[] = [
    {
      route: '/solicita-mesa',
      title: 'Solicita tu mesa', // cliente y anonimo
      icon: 'restaurant',
      class: !this.solicitudAceptada ? 'icon_5px' : 'icon_4px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: !this.solicitudAceptada
    },
    {
      route: '/scanner-mesa',
      title: 'Escanear mesa asignada', // cliente y anonimo
      icon: 'qr-code-outline',
      class: !this.solicitudAceptada ? 'icon_5px' : 'icon_4px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: this.solicitudAceptada
    },
    {
      route: '/consulta-mozo',
      title: 'Consulta al mozo', // cliente y anonimo
      icon: 'chatbubbles',
      class: !this.solicitudAceptada ? 'icon_5px' : 'icon_4px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: this.solicitudAceptada
    },
    {
      route: '/reserva',
      title: 'Hacé tu reserva', // cliente
      icon: 'calendar',
      class: !this.solicitudAceptada ? 'icon_5px' : 'icon_4px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: true
    },
    {
      route: '/delivery',
      title: 'Hacé tu pedido y te lo llevamos', // cliente
      icon: 'bicycle',
      class: !this.solicitudAceptada ? 'icon_5px' : 'icon_4px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: true
    }
  ];

  private empleadoCards: Menu[] = [
    {
      route: '/producto',
      title: 'Alta de Producto', // cocinero o bartender
      icon: 'restaurant',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: this.tipoEmpleado === 'cocinero' || this.tipoEmpleado === 'bartender'
    },
    {
      route: '/cliente',
      title: 'Alta de cliente', // Metre
      icon: 'person-add',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: this.tipoEmpleado === 'metre'
    },
    {
      route: '/mesa',
      title: 'Alta de Mesas', // Mozo
      icon: 'help-buoy',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: this.tipoEmpleado === 'mozo'
    },
    {
      route: '/encuesta',
      title: 'Lista de pedidos', // todos menos el metre
      icon: 'reader-outline',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: this.tipoEmpleado !== 'metre'
    },
    {
      route: '/listaMesaAsignadas',
      title: 'Lista de mesas a asignar', // metre
      icon: 'reader-outline',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: this.tipoEmpleado === 'metre'
    },
    {
      route: '/encuesta',
      title: 'Tomar pedido', // Mozo
      icon: 'reader-outline',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: this.tipoEmpleado === 'mozo'
    },
    {
      route: '/encuesta',
      title: 'Encuesta empleado', // todos los empleados
      icon: 'list',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: true
    }
  ];

  private supervisorCards: Menu[] = [
    {
      route: '/empleado',
      title: 'Alta de empleados', // Supervisor o dueño
      icon: 'person-add',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: true
    },
    {
      route: '/mesa',
      title: 'Alta de mesas', // Supervisor o dueño
      icon: 'help-buoy',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: true
    },
    {
      route: '/solicitud',
      title: 'Solicitud de clientes', // Supervisor o dueño
      icon: 'people',
      class: 'icon_5px',
      style: {'background-color': 'rgb(83 156 247)', 'align-text': 'center'},
      visible: true
    }
  ];

  constructor() {
    console.log('Entra al home');
   }


   getMenuCliente() {
     this.listaMenu = [];
     this.listaMenu = this.clienteCards;
   }

   getMenuEmpleado() {
     this.listaMenu = [];
     this.listaMenu = this.empleadoCards;
   }

   getMenuSupervisor() {
     this.listaMenu = [];
     this.listaMenu = this.supervisorCards;
   }

}

export interface Menu {
  route: string;
  title: string;
  icon: string;
  class: string;
  style: object;
  visible: boolean;
}
