import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {IOficinas} from "@data/interfaces/i-oficinas";
import {API_ROUTES} from "@data/constants/routes";
import {catchError, map} from "rxjs/operators";
import {IContactos} from "@data/interfaces/i-contactos";

@Injectable({
  providedIn: 'root'
})
export class ContactosCeService {

  constructor(public http: HttpClient) { }

    obtener(fk_cliente: number): Observable<{
                                              error: boolean,
                                              msg: string,
                                              data: IContactos[]
                                            }>
    {
    const response = {error: false, msg: '', data: [] as  IContactos[] };
    return this.http.get<{contactos: IContactos[]}>(API_ROUTES.CLIENTE_EMPRESARIAL.CARGOS+`${fk_cliente}`)
      .pipe(
        map( r =>  {
          response.data = r.contactos;
          return response;
        }),
        catchError((e) => of(response))
      );
  } // fin del metodo obtener

  actualizar(formData: any): Observable<{
                                    error: boolean;
                                    msg: string;
                                    data: any } >
  {
    const response = {error: true, msg: '', data: null as any};
    return this.http.put<{respuesta: any}>(API_ROUTES.CLIENTE_EMPRESARIAL.
      CARGO, formData)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.respuesta;
          return response;
        }),
        catchError(() => of(response))
      );


  }// fin del metodo actualizar


  deleteContacto(contactoId: number, cargoId: number): Observable<{
                                                                  error: boolean;
                                                                  msg: string;
                                                                  data: string }>
  {
    const response = {error: true, msg: '', data: ''};
    return this.http.delete<{message: string}>(API_ROUTES.CLIENTE_EMPRESARIAL.
      CARGO + `?id=${contactoId}&fkCargo=${cargoId}`)
      .pipe(
        map(r => {
          console.log(r);
          response.error = false;
          response.data = r.message;
          return response;
        }),
        catchError(() => of(response))
      );

  }

  guardar(formData: any):
    Observable<{
      error: boolean;
      msg: string;
      data: any }
      >
     {
       const response = {error: true, msg: '', data: null as any};
       return this.http.post<{contacto_ce: any}>(API_ROUTES.CLIENTE_EMPRESARIAL.CARGO, formData)
         .pipe(
           map(r => {
             response.error = false;
             response.data = r.contacto_ce;
             return response;
           }),
           catchError(() => of(response))
         );

     }
}
