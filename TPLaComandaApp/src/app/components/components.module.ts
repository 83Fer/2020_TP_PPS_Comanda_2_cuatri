import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonFlotatingComponent } from './button-flotating/button-flotating.component';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash/splash.component';
import { HeaderComponent } from './header/header.component';
import { ButtonUnidadesComponent } from './button-unidades/button-unidades.component';
import { ButtonCreatePedidoComponent } from './button-create-pedido/button-create-pedido.component';


@NgModule({
    declarations: [
      ButtonFlotatingComponent,
      SplashComponent,
      HeaderComponent,
      ButtonUnidadesComponent,
      ButtonCreatePedidoComponent
    ],
    exports: [
      ButtonFlotatingComponent,
      SplashComponent,
      HeaderComponent,
      ButtonUnidadesComponent,
      ButtonCreatePedidoComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
  })
  export class ComponentsModule { }



