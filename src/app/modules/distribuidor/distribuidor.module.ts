import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistribuidorRoutingModule } from './distribuidor-routing.module';
import { DistribuidorComponent } from './distribuidor/distribuidor.component';


@NgModule({
  declarations: [
    DistribuidorComponent
  ],
  imports: [
    CommonModule,
    DistribuidorRoutingModule
  ]
})
export class DistribuidorModule { }
