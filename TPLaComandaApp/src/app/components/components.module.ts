import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonFlotatingComponent } from './button-flotating/button-flotating.component';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash/splash.component';
import { HeaderComponent } from './header/header.component';
import { ButtonUnidadesComponent } from './button-unidades/button-unidades.component';
import { ButtonCreatePedidoComponent } from './button-create-pedido/button-create-pedido.component';
import { InputSwitchComponent } from './input-switch/input-switch.component';
import { ButtonUpdateEstadoPedidoComponent } from './button-update-estado-pedido/button-update-estado-pedido.component';
import { ButtonUpdatePedidoConfirmComponent } from './button-update-pedido-confirm/button-update-pedido-confirm.component';
import { ButtonUpdatePedidoRecepcionComponent } from './button-update-pedido-recepcion/button-update-pedido-recepcion.component';
import { ButtonUpdateMozoConfirmaPedidoComponent } from './button-update-mozo-confirma-pedido/button-update-mozo-confirma-pedido.component';


@NgModule({
    declarations: [
      ButtonFlotatingComponent,
      SplashComponent,
      HeaderComponent,
      ButtonUnidadesComponent,
      ButtonCreatePedidoComponent,
      InputSwitchComponent,
      ButtonUpdateEstadoPedidoComponent,
      ButtonUpdatePedidoConfirmComponent,
      ButtonUpdatePedidoRecepcionComponent,
      ButtonUpdateMozoConfirmaPedidoComponent
    ],
    exports: [
      ButtonFlotatingComponent,
      SplashComponent,
      HeaderComponent,
      ButtonUnidadesComponent,
      ButtonCreatePedidoComponent,
      InputSwitchComponent,
      ButtonUpdateEstadoPedidoComponent,
      ButtonUpdatePedidoConfirmComponent,
      ButtonUpdatePedidoRecepcionComponent,
      ButtonUpdateMozoConfirmaPedidoComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
  })
  export class ComponentsModule { }



