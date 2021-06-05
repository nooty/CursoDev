import { forwardRef, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarMovimentos } from '../modelo/listar-movimentos';
import { Movimento } from '../modelo/movimento';
import { map } from 'rxjs/operators';
import { Grafico } from '../modelo/grafico';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => MovimentoService)
})
export abstract class IMovimentoService {
  public abstract inserir(r: Movimento): Observable<any>;
  public abstract editar(r: Movimento): Observable<any>;
  public abstract excluir(id: number): Observable<any>;
  public abstract listar(entrada: ListarMovimentos): Observable<Movimento[]>;
  public abstract consultarGrafico(): Observable<Grafico>;
}

@Injectable()
export class MovimentoService implements IMovimentoService {
  private readonly URL_MOVIMENTOS: string = 'http://localhost:5000/api/movimentos/';
  private readonly URL_MOVIMENTOS_GRAFICO: string = 'http://localhost:5000/api/movimentos/grafico/';

  constructor(private http: HttpClient) {

  }

  public inserir(r: Movimento): Observable<any> {
    return this.http.post(this.URL_MOVIMENTOS, r);
  }

  public editar(r: Movimento): Observable<any> {
    return this.http.put(this.URL_MOVIMENTOS, r);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(this.URL_MOVIMENTOS + id);
  }

  public listar(entrada: ListarMovimentos): Observable<Movimento[]> {
    let p = new HttpParams()
    let filtro = p
      .append('dataInicial', entrada.dataInicial.toISOString())
      .append('dataFinal', entrada.dataFinal.toISOString());

    return this.http.get<Movimento[]>(this.URL_MOVIMENTOS, { params: filtro })
      .pipe(map(
        (x: Movimento[]) => {
          return x.map(e => {
            e.data = new Date(e.data)
            return e;
          });
        }));
  }

  public consultarGrafico(): Observable<Grafico> {
    return this.http.get<Grafico>(this.URL_MOVIMENTOS_GRAFICO);
  }

}
