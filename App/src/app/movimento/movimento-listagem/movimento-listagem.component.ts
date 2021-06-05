import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movimento-listagem',
  templateUrl: './movimento-listagem.component.html',
  styleUrls: ['./movimento-listagem.component.scss']
})
export class MovimentoListagemComponent implements OnInit, OnDestroy {

  modeloFiltro: FormGroup = this.fb.group({
    periodo: []
  });

  periodo: Date[] = [];
  pesquisa: string = '';

  subs: Subscription;

  constructor(private fb: FormBuilder, private rotaAtivada: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  ngOnInit(): void {
    this.subs = this.modeloFiltro.controls.periodo.valueChanges.subscribe((val) => {
      this.periodo = val;
    });

    this.modeloFiltro.controls.periodo.setValue([
      moment().add(-4, 'month').toDate(),
      moment().toDate()
    ]);

    this.rotaAtivada.paramMap.subscribe((p: ParamMap) => {
      if (p.has('mv')) {
        this.pesquisa = p.get('mv');
      }
    });
  }

}
