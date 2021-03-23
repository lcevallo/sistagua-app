import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROUTES} from "@data/constants/routes";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import { IOficinas } from '@data/interfaces/i-oficinas';

@Injectable({
  providedIn: 'root'
})
export class OficinasCeService {

  constructor(public http: HttpClient) { }

  guardar(formData: any): Observable<{
                        error: boolean;
                        msg: string;
                        data: any }
    >
  {
    const response = {error: true, msg: '', data: null as any};
    return this.http.post<{oficina_ce: any}>(API_ROUTES.CLIENTE_EMPRESARIAL.OFICINA, formData)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.oficina_ce;
          return response;
        }),
        catchError(() => of(response))
      );
  }


  actualizar(formData: any): Observable<{
    error: boolean;
    msg: string;
    data: any }
      >
      {
      const response = {error: true, msg: '', data: null as any};
      return this.http.put<{respuesta: any}>(API_ROUTES.CLIENTE_EMPRESARIAL.
        OFICINA, formData)
      .pipe(
                map(r => {
                            response.error = false;
                            response.data = r.respuesta;
                            return response;
                          }),
                catchError(() => of(response))
            );
      }

  obtener(fk_cliente: number): Observable<
  {
    error: boolean,
    msg: string,
    data: IOficinas[]
  }
  >{

    const response = {error: false, msg: '', data: [] as  IOficinas[] };
    return this.http.get<{oficinas: IOficinas[]}>(API_ROUTES.CLIENTE_EMPRESARIAL.OFICINAS+`/${fk_cliente}`)
    .pipe(
      map( r =>  {
        response.data = r.oficinas;
        return response;
      }),
    catchError((e) => of(response))
  );
  }


}
