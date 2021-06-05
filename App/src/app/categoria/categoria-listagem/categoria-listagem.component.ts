import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-listagem',
  templateUrl: './categoria-listagem.component.html',
  styleUrls: ['./categoria-listagem.component.scss']
})
export class CategoriaListagemComponent implements OnInit {
  
  constructor(private fb: FormBuilder, 
    private servico: ICategoriaService
    ) { }

  ngOnInit(): void { }
}
