import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaListagemComponent } from './caixa-listagem.component';

describe('CaixaListagemComponent', () => {
  let component: CaixaListagemComponent;
  let fixture: ComponentFixture<CaixaListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaixaListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
