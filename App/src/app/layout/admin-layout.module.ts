import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { ComponentesModule } from './componentes/componentes.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,

    ComponentesModule,

    AdminLayoutRoutingModule
  ],

})

export class AdminLayoutModule { }
