import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipanteRoutingModule } from './participante-routing.module';
import { ParticipanteComponent } from './participante/participante.component';


@NgModule({
  declarations: [
    ParticipanteComponent
  ],
  imports: [
    CommonModule,
    ParticipanteRoutingModule
  ]
})
export class ParticipanteModule { }
