import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentoListagemComponent } from './movimento-listagem/movimento-listagem.component';

const routes: Routes = [
  {
    path: '',
    component: MovimentoListagemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentoRoutingModule { }
