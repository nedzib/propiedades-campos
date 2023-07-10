import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/distribuidor/distribuidor.module').then(m => m.DistribuidorModule)
  }, {
    path: 'about', loadChildren: () => import('./modules/participante/participante.module').then(m => m.ParticipanteModule)
  }, {
    path: 'ayuda', loadChildren: () => import('./modules/ayuda/ayuda.module').then(m => m.AyudaModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
