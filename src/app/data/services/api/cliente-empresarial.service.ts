import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { IclienteEmpresarial, iClienteEmpresarialSend } from '@data/interfaces/icliente-empresarial';
import { ApiClass } from '@data/schema/ApiClass.class';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteEmpresarialService extends ApiClass{

  constructor(public http: HttpClient){
    super(http);
  }

  guardar( clienteEmpresarial: iClienteEmpresarialSend ): Observable<{
    error: boolean; msg: string; data: number}> {
    const response = {error: true, msg: '', data: null as any};
    return this.http.post<{cliente: number}>(API_ROUTES.CLIENTE_EMPRESARIAL.CLIENTE, clienteEmpresarial)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.cliente;
          return response;
        }),
        catchError(() => of(response))
      );
  }
}
