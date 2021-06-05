import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentoRoutingModule } from './movimento-routing.module';
import { MovimentoListagemComponent } from './movimento-listagem/movimento-listagem.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboBoxAllModule, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TabelaComponent } from './tabela/tabela.component';


@NgModule({
  declarations: [MovimentoListagemComponent, TabelaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    GridAllModule,
    DropDownListAllModule,
    DateRangePickerModule,

    MovimentoRoutingModule
  ]
})
export class MovimentoModule { }
