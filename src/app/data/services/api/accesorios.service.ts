import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { IAccesorios } from '@data/interfaces/i-accesorios';
import { ApiClass } from '@data/schema/ApiClass.class';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccesoriosService extends ApiClass{

  constructor(public http: HttpClient) {
    super(http);
  }
  /**
   * Obtiene todos los accesorios
   */
  getAllAccesorios(): Observable<{
    error: boolean,
    msg: string,
    data: IAccesorios[]
  }> {

    const response = {error: false, msg: '', data: [] as  IAccesorios[] };

    return this.http.get<{accesorios: IAccesorios[]}> (API_ROUTES.ACCESORIO.LISTA)
      .pipe(
          map( r =>  {
            response.data = r.accesorios;
            return response;
          }),
        catchError((e) => of(response))
      );
  }

  getById(id: number): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {

    const response = {error: false, msg: '', data: null as any };

    return this.http.get<{accesorio: IAccesorios}> (API_ROUTES.ACCESORIO.ACCESORIO_DETAIL+'?id='+id)
      .pipe(
          map( r =>  {
            response.data = r.accesorio;
            return response;
          }),
        catchError((e) => of(response))
      );
  }

  guardar(accesorioObj: IAccesorios): Observable<{
      error: boolean;
      msg: string;
      data: any
    }>{
    const response = {error: true, msg: '', data: null as any};
    return this.http.post<{accesorio: number}>(API_ROUTES.ACCESORIO.ACCESORIO_DETAIL, accesorioObj)
    .pipe(
      map(r => {
        response.data = r.accesorio;
        return response;
      }),
      catchError(() => of(response))
    );
  }

  actualizar(accesorioObj: IAccesorios): Observable<{error: boolean; msg: string; data: any }>{
    const response = {error: true, msg: '', data: null as any};
    return this.http.put<{accesorio: number}>(API_ROUTES.ACCESORIO.ACCESORIO_DETAIL, accesorioObj)
      .pipe(
        map(r => {
          response.data = r.accesorio;
          return response;
        }),
        catchError(() => of(response))
      );
  }

}
