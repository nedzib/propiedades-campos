import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistribuidorComponent } from './distribuidor/distribuidor.component';

const routes: Routes = [
  { path: '', component: DistribuidorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistribuidorRoutingModule { }
