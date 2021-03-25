import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { IOficinas } from '@data/interfaces/i-oficinas';
import { iCargo, IclienteEmpresarial, iClienteEmpresarialSend } from '@data/interfaces/icliente-empresarial';
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

  getAllClientesEmpresarial(): Observable<{
    error: boolean,
    msg: string,
    data: IclienteEmpresarial[]
  }> {

    const response = {error: false, msg: '', data: [] as  IclienteEmpresarial[] };

    return this.http.get <{clientes: IclienteEmpresarial[]} > (API_ROUTES.CLIENTE_EMPRESARIAL.LISTA)
      .pipe(
          map( r =>  {

            response.data = r.clientes;
            r.clientes.map(cliente => cliente.tipo='EMPRESARIAL');
            return response;
          }),
        catchError((e) => of(response))
      );
  }

  getClienteByRuc(buscar: string): Observable<{
    error: boolean,
    msg: string,
    data: IclienteEmpresarial[]
  }>{
    //const response = {error: false, msg: '', data: null as any};
    const response = {error: false, msg: '', data: [] as  IclienteEmpresarial[]};
    //return this.http.get<IclienteNatural>(`${API_ROUTES.CLIENTE_NATURAL.LISTA}?ruc=${cedula}`).pipe(
    return this.http.get <{clientes: IclienteEmpresarial[]} > (`${API_ROUTES.CLIENTE_EMPRESARIAL.LISTA}?${buscar}`).pipe(
      map(r => {
          /*response.data = r;
          return response;*/
          response.data = r.clientes;
          r.clientes.map(cliente => cliente.tipo='EMPRESARIAL');
          return response;
        }
      ),
      catchError(() => of(response))
    );
  }

  getById(id: number): Observable<{
    error: boolean,
    msg: string,
    data: any
  }>{
    //const response = {error: false, msg: '', data: null as any};
    const response = {error: false, msg: '', data: {
      cliente_empresarial: [] as  IclienteEmpresarial[],
      oficinas: [] as  IOficinas[],
      cargos: [] as iCargo[]
    } };
    //return this.http.get<clientes: IclienteEmpresarial[]>(`${API_ROUTES.CLIENTE_NATURAL.LISTA}?id=${id}`).pipe(
    return this.http.get <{data: any} > (`${API_ROUTES.CLIENTE_EMPRESARIAL.INFO}?id=${id}`).pipe(
      map(r => {
          /*response.data = r;
          return response;*/
          response.data.cliente_empresarial = r.data.cliente_empresarial;
          response.data.oficinas = r.data.oficinas;
          response.data.cargos = r.data.cargos;

          return response;
        }
      ),
      catchError(() => of(response))
    );
  }

  guardar( clienteEmpresarial: iClienteEmpresarialSend ): Observable<{
    error: boolean; msg: string; data: number}> {
    const response = {error: true, msg: '', data: null as any};
    return this.http.post<{id_cliente_empresarial: number}>(API_ROUTES.CLIENTE_EMPRESARIAL.CLIENTE, clienteEmpresarial)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.id_cliente_empresarial;
          return response;
        }),
        catchError(() => of(response))
      );
  }
}
