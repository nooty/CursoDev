import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ActionEventArgs, EditSettingsModel, FilterSettingsModel, Grid, ReturnType } from '@syncfusion/ej2-angular-grids';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ICategoriaService } from 'src/app/categoria/categoria.service';
import { Categoria } from 'src/app/modelo/categoria';
import { ListarCategorias } from 'src/app/modelo/listar-categorias';
import { ListarMovimentos } from 'src/app/modelo/listar-movimentos';
import { Movimento } from 'src/app/modelo/movimento';
import { IMovimentoService } from '../movimento.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  @ViewChild('tabela')
  tabela: Grid;

  private _periodo: Date[] = [moment().add(-4, 'month').toDate(), moment().toDate()];

  @Input()
  set periodo(v: Date[]) {
    if (!v || v.length < 2)
      return;

    console.log('PERIODO');
    console.log(v);

    this._periodo = v;
    this.atualizar(v).subscribe();
  };

  get periodo(): Date[] {
    return this._periodo;
  }

  private _pesquisa: string;

  @Input()
  set pesquisa(v: string) {
    this._pesquisa = v;

    if (this.tabela)
      this.tabela.search(v);
  };

  get pesquisa(): string {
    return this._pesquisa;
  }

  // Armazena movimento sendo editado.
  movimentoEd: Movimento;

  // Armazena movimentos na tablea.
  movimentos: any[] = [];
  // Aramazena categorias do tipo receita para o momento da inserção/edição.
  categoriasReceitas: Categoria[] = [];
  // Aramazena categorias do tipo despesa para o momento da inserção/edição.
  categoriasDespesas: Categoria[] = [];

  // Configuração do filtro na tabela.
  filtroConfiguracao: FilterSettingsModel = {
    type: 'Excel'
  }

  // Configucaração de edição da tabela.
  edicaoConfiguracao: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true
  };

  // Menus que aparecem na toolbar da tabela.
  menuOpcoes: Object[] = [
    { prefixIcon: 'e-add', text: 'Receita', id: 'receita' },
    { prefixIcon: 'e-add ', text: 'Despesa', id: 'despesa' },
    { type: 'Separator' },
    'Update', 'Delete', 'Cancel',
    { type: 'Separator' },
    'ExcelExport', 'Print',
    'Search'
  ]

  constructor(private servico: IMovimentoService,
    private categoriaServico: ICategoriaService,
    private rotaAtivada: ActivatedRoute) { }

  ngOnInit(): void {
  }

  atualizar(periodo: Date[]): Observable<any> {
    return this.servico.listar(new ListarMovimentos({
      dataInicial: periodo[0],
      dataFinal: periodo[1],
    }))
      .pipe(
        tap((r) => this.movimentos = r),
        switchMap(() => this.categoriaServico.listarCategorias(new ListarCategorias({ tipo: 'Receita' }))),
        tap((r) => this.categoriasReceitas = r),
        switchMap(() => this.categoriaServico.listarCategorias(new ListarCategorias({ tipo: 'Despesa' }))),
        tap((r) => this.categoriasDespesas = r),
      );
  }

  acaoIniciada(args: ActionEventArgs) {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      let reg = new Movimento(args.rowData);
      this.movimentoEd = reg;
    }
    else if (args.requestType === 'save') {
      args.data['categoriaId'] = this.movimentoEd['categoriaId'];
      args.data['categoriaDescricao'] = this.movimentoEd['categoriaDescricao'];
    }
  }

  mudouSelecao(args: SelectEventArgs) {
    this.movimentoEd.categoriaDescricao = (<Categoria>args.itemData).descricao;
  }

  acaoCompleta(args: ActionEventArgs) {
    if (args.requestType === 'save') {
      let reg = new Movimento(args.data);

      if (reg.id > 0) {
        this.servico.editar(reg)
          .pipe(
            switchMap(() => this.atualizar(this.periodo))
          )
          .subscribe();
      } else {
        this.servico.inserir(reg)
          .pipe(
            switchMap(() => this.atualizar(this.periodo))
          )
          .subscribe();
      }
    }
    else if (args.requestType === 'delete') {
      let reg = new Movimento(args.data[0]);

      this.servico.excluir(reg.id)
        .pipe(
          switchMap(() => this.atualizar(this.periodo))
        )
        .subscribe();
    }
  }

  acaoToolbar(args: ClickEventArgs) {
    if (args.item.id === 'receita') {
      this.tabela.getColumnByField('categoriaTipo').defaultValue = 'Receita';
      this.tabela.addRecord();
    }
    else if (args.item.id === 'despesa') {
      this.tabela.getColumnByField('categoriaTipo').defaultValue = 'Despesa';
      this.tabela.addRecord();
    }
    else if (args.item.id === 'tabela_excelexport') {
      this.tabela.excelExport();
    }
  }

  // Somatório de total receita - total receita que é mostrado no rodapé da tabela.
  public somador = (sdata: ReturnType) => {
    let despesas = sdata.result?.filter((i: Movimento) => i.categoriaTipo === 'Despesa')
      .map((m: Movimento) => m.valor)
      .reduce((p: number, c: number) => p + c, 0);

    let raceitas = sdata.result?.filter((i: Movimento) => i.categoriaTipo === 'Receita')
      .map((m: Movimento) => m.valor)
      .reduce((p: number, c: number) => p + c, 0);

    return raceitas - despesas;
  }

  public tabelaCarregada() {
    this.tabela.search(this.pesquisa);
  }
}
