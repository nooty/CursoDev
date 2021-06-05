import { Component, OnInit } from '@angular/core';
import { AxisModel, ITextRenderEventArgs, LegendSettingsModel, MarkerSettingsModel } from '@syncfusion/ej2-angular-charts';
import { IMovimentoService } from '../../movimento/movimento.service';
import { Grafico } from '../../modelo/grafico';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public movimentosReceita: Object[] = [];
  public movimentosDespesa: Object[] = [];

  public corSeries: string[] = ['#2CA8FF', '#ef5350']

  public primarioXAxis: AxisModel = {
    valueType: 'Category', labelStyle: { color: '#fff' }
  };

  public primarioYAxis: AxisModel = {
    labelStyle: { color: '#fff' }
  };

  marcaEstilo: MarkerSettingsModel = { dataLabel: { visible: true, position: 'Top'} }

  public legandaEstilo: LegendSettingsModel = { titleStyle: { color: '#fff' } }

  constructor(private servico: IMovimentoService) { }

  ngOnInit(): void {
    this.servico.consultarGrafico()
    .subscribe((g: Grafico) => {
      this.movimentosReceita = g.serieReceita;
      this.movimentosDespesa = g.serieDespesa;
    });
  }
}
