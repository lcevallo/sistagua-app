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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
