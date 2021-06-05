import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(x => x.DashboardModule)
            },
            {
                path: 'movimentos', loadChildren: () => import('../movimento/movimento.module').then(x => x.MovimentoModule)
            },
            {
                path: 'categorias', loadChildren: () => import('../categoria/categoria.module').then(x => x.CategoriaModule)
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
