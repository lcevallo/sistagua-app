import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SkeletonComponent} from '@layout/skeleton/skeleton.component';

const routes: Routes = [
  {path: '', redirectTo: 'clientes', pathMatch: 'full'},

  {
    path: 'clientes',
    component: SkeletonComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@modules/clientes/clientes.module').then( (m) => m.ClientesModule)
      }
    ]
  },
  {
    path: 'accesorios',
    component: SkeletonComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@modules/accesorios/accesorios.module').then( (m) => m.AccesoriosModule)
      }
    ]
  },
  {
    path: 'filtraciones',
    component: SkeletonComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@modules/filtraciones/filtraciones.module').then( (m) => m.FiltracionesModule)
      }
    ]
  },
  {
    path: 'ficha-tecnica',
    component: SkeletonComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@modules/ficha-tecnica/ficha-tecnica.module').then( (m) => m.FichaTecnicaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
