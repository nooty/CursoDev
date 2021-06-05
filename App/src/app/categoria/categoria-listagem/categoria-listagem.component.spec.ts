import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListagemComponent } from './categoria-listagem.component';

describe('CategoriaListagemComponent', () => {
  let component: CategoriaListagemComponent;
  let fixture: ComponentFixture<CategoriaListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
