import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaListagemComponent } from './categoria-listagem/categoria-listagem.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { FormsModule } from '@angular/forms';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabelaComponent } from './tabela/tabela.component';


@NgModule({
  declarations: [CategoriaListagemComponent, TabelaComponent],
  imports: [
    CommonModule,

    FormsModule,

    GridAllModule,
    DropDownListAllModule,

    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
