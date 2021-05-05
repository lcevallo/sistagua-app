import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { IFiltraciones } from '@data/interfaces/ifiltraciones';
import { ApiClass } from '@data/schema/ApiClass.class';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiltracionesServices extends ApiClass{

  constructor(public http: HttpClient) {
    super(http);
  }

  getAll(): Observable<{error: boolean, msg: string, data: IFiltraciones[]}> {

    const response = {error: false, msg: '', data: [] as  IFiltraciones[] };

    return this.http.get<{filtraciones: IFiltraciones[]}> (API_ROUTES.FILTRACION.LISTA)
      .pipe(
          map( r =>  {
            response.data = r.filtraciones;
            return response;
          }),
        catchError((e) => of(response))
      );
  }

  getById(id: number): Observable<{ error: boolean, msg: string, data: any }> {

    const response = {error: false, msg: '', data: null as any };

    return this.http.get<{filtracion: IFiltraciones}> (API_ROUTES.FILTRACION.FILTRACION_DETAIL+'?id='+id)
      .pipe(
          map( r =>  {
            response.data = r.filtracion;
            return response;
          }),
        catchError((e) => of(response))
      );
  }

  getByNombre(nombre: string): Observable<{ error: boolean, msg: string, data: IFiltraciones[] }> {

    const response = {error: false, msg: '', data: [] as  IFiltraciones[] };

    return this.http.get<{filtraciones: IFiltraciones[]}> (`${API_ROUTES.FILTRACION.LISTA}?${nombre}`)
      .pipe(
          map( r =>  {
            response.data = r.filtraciones;
            return response;
          }),
        catchError((e) => of(response))
      );
  }

  guardar(filtroObj: IFiltraciones): Observable<{error: boolean; msg: string; data: any}>{
    const response = {error: true, msg: '', data: null as any};
    return this.http.post<{filtracion: number}>(API_ROUTES.FILTRACION.FILTRACION_DETAIL, filtroObj)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.filtracion;
          return response;
        }),
        catchError(() => of(response))
      );
  }

  actualizar(filtroObj: IFiltraciones): Observable<{error: boolean; msg: string; data: any }>{
    const response = {error: true, msg: '', data: null as any};
    return this.http.put<{filtracion: number}>(API_ROUTES.FILTRACION.FILTRACION_DETAIL+'?id='+filtroObj.id, filtroObj)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.filtracion;
          return response;
        }),
        catchError(() => of(response))
      );
  }

  eliminar(id: number): Observable<{error: boolean; msg: string; data: IFiltraciones[] }>{
    const response = {error: true, msg: '', data: [] as  IFiltraciones[]};
    return this.http.delete<{filtraciones: IFiltraciones[]}>(API_ROUTES.FILTRACION.FILTRACION_DETAIL+'?id='+id)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.filtraciones;
          return response;
        }),
        catchError(() => of(response))
      );
  }
}
