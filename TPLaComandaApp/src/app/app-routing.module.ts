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
  },
  {
    path: 'lista-pedidos',
    loadChildren: () => import('./pages/lista-pedidos/lista-pedidos.module').then( m => m.ListaPedidosPageModule)
  },
  {
    path: 'estado-pedido',
    loadChildren: () => import('./pages/estado-pedido/estado-pedido.module').then( m => m.EstadoPedidoPageModule)
  },
  {
    path: 'estado-pedido-cliente',
    loadChildren: () => import('./pages/estado-pedido-cliente/estado-pedido-cliente.module').then( m => m.EstadoPedidoClientePageModule)
  },
  {
    path: 'home-mesas',
    loadChildren: () => import('./pages/home-mesas/home-mesas.module').then( m => m.HomeMesasPageModule)
  },
  {
    path: 'estado-pedido-cliente-confirma',
    loadChildren: () => import('./pages/estado-pedido-cliente-confirma/estado-pedido-cliente-confirma.module')
    .then( m => m.EstadoPedidoClienteConfirmaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
