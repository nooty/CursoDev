import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaListagemComponent } from './categoria-listagem/categoria-listagem.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriaListagemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
