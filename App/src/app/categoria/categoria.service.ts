import { HttpClient, HttpParams } from '@angular/common/http';
import { forwardRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../modelo/categoria';
import { ListarCategorias } from '../modelo/listar-categorias';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => CategoriaService)
})
export abstract class ICategoriaService {
  public abstract inserirCategoriaReceita(r: Categoria): Observable<any>;
  public abstract editarCategoriaReceita(r: Categoria): Observable<any>;
  public abstract excluirCategoriaReceita(id: number): Observable<any>;

  public abstract inserirCategoriaDespesa(r: Categoria): Observable<any>;
  public abstract editarCategoriaDespesa(r: Categoria): Observable<any>;
  public abstract excluirCategoriaDespesa(id: number): Observable<any>;

  public abstract listarCategorias(entrada: ListarCategorias): Observable<Categoria[]>;
}

@Injectable()
export class CategoriaService implements ICategoriaService {
  private readonly URL_CATEGORIAS: string = 'http://localhost:5000/api/categorias/';
  private readonly URL_CATEGORIAS_RECEITAS: string = 'http://localhost:5000/api/categorias/receitas/';
  private readonly URL_CATEGORIAS_DESPESAS: string = 'http://localhost:5000/api/categorias/despesas/';

  constructor(private http: HttpClient) { }

  public inserirCategoriaReceita(r: Categoria): Observable<any> {
    return this.http.post(this.URL_CATEGORIAS_RECEITAS, r);
  }
  
  public editarCategoriaReceita(r: Categoria): Observable<any> {
    return this.http.put(this.URL_CATEGORIAS_RECEITAS, r);
  }

  public excluirCategoriaReceita(id: number): Observable<any> {
    return this.http.delete(this.URL_CATEGORIAS_RECEITAS + id);
  }

  public inserirCategoriaDespesa(r: Categoria): Observable<any> {
    return this.http.post(this.URL_CATEGORIAS_DESPESAS, r);
  }

  public editarCategoriaDespesa(r: Categoria): Observable<any> {
    return this.http.put(this.URL_CATEGORIAS_DESPESAS, r);
  }

  public excluirCategoriaDespesa(id: number): Observable<any> {
    return this.http.delete(this.URL_CATEGORIAS_DESPESAS + id);
  }

  public listarCategorias(entrada: ListarCategorias): Observable<Categoria[]> {
    let filtro = new HttpParams().append('tipo', entrada.tipo);

    return this.http.get<Categoria[]>(this.URL_CATEGORIAS, { params: filtro });
  }

}