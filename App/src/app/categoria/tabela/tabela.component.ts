import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActionEventArgs, EditSettingsModel, FilterSettingsModel, Grid } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, tap } from 'rxjs/operators';
import { Categoria } from 'src/app/modelo/categoria';
import { ListarCategorias } from 'src/app/modelo/listar-categorias';
import { ICategoriaService } from '../categoria.service';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  @ViewChild('tabela')
  tabela: Grid;

  categorias: Categoria[] = [];

  filtroConfiguracao: FilterSettingsModel = {
    type: 'Excel'
  }

  edicaoConfiguracao: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true
  };

  menuOpcoes: Object[] = [
    { prefixIcon: 'e-add', text: 'Receita', id: 'receita' },
    { prefixIcon: 'e-add ', text: 'Despesa', id: 'despesa' },
    { type: 'Separator' },
    'Update', 'Delete', 'Cancel', 
    { type: 'Separator' },
    'ExcelExport', 'Print',
    'Search'
  ]
  
  constructor(private fb: FormBuilder, 
    private servico: ICategoriaService
    ) { }
    
  ngOnInit(): void {
    this.atualizar().subscribe();
  }

  atualizar(): Observable<any> {
    return this.servico.listarCategorias(new ListarCategorias())
      .pipe(
        tap((r) => this.categorias = r)
      );
  }

  acaoCompleta(args: ActionEventArgs) {
    if (args.requestType === 'save') {
      let reg = new Categoria(args.data);

      let inserirCategoriaReceita =  this.servico.inserirCategoriaReceita(reg).pipe(switchMap(() => this.atualizar()));
      let editarCategoriaReceita =  this.servico.editarCategoriaReceita(reg).pipe(switchMap(() => this.atualizar()));

      let inserirCategoriaDespesa =  this.servico.inserirCategoriaDespesa(reg).pipe(switchMap(() => this.atualizar()));
      let editarCategoriaDespesa =  this.servico.editarCategoriaDespesa(reg).pipe(switchMap(() => this.atualizar()));

      if (reg.id > 0) {
        if(reg.tipo === 'Receita')
        editarCategoriaReceita.subscribe();
        else 
          editarCategoriaDespesa.subscribe();
      } else {
        if(reg.tipo === 'Receita')
          inserirCategoriaReceita.subscribe();
        else 
          inserirCategoriaDespesa.subscribe();
      }
    }
    else if (args.requestType === 'delete')  {
      let reg = new Categoria(args.data[0]);

      let excluirCategoriaReceita =  this.servico.excluirCategoriaReceita(reg.id).pipe(switchMap(() => this.atualizar()));
      let excluirCategoriaDespesa =  this.servico.excluirCategoriaDespesa(reg.id).pipe(switchMap(() => this.atualizar()));

      if(reg.tipo === 'Receita')
        excluirCategoriaReceita.subscribe();
      else 
        excluirCategoriaDespesa.subscribe();
    }
  }

  acaoToolbar(args: ClickEventArgs) {
    if (args.item.id === 'receita') {
      this.tabela.getColumnByField('tipo').defaultValue = 'Receita';
      this.tabela.getColumnByField('tipo').allowEditing = false;
      this.tabela.addRecord();
    }
    else if (args.item.id === 'despesa') {
      this.tabela.getColumnByField('tipo').defaultValue = 'Despesa';
      this.tabela.addRecord();
    }
    else if (args.item.id === 'tabela_excelexport') {
      this.tabela.excelExport();
  }
  }

}
