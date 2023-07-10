import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipanteComponent } from './participante/participante.component';

const routes: Routes = [
  { path: '', component: ParticipanteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipanteRoutingModule { }
