import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'scanner-mesa',
    loadChildren: () => import('./pages/scanner-mesa/scanner-mesa.module').then( m => m.ScannerMesaPageModule)
  },
  {
    path: 'concepto/:id',
    loadChildren: () => import('./pages/concepto/concepto.module').then( m => m.ConceptoPageModule)
  },
  {
    path: 'orden',
    loadChildren: () => import('./pages/orden/orden.module').then( m => m.OrdenPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'solicita-mesa',
    loadChildren: () => import('./pages/scanner-solicitar-mesa/scanner-solicitar-mesa.module').then( m => m.ScannerSolicitarMesaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
