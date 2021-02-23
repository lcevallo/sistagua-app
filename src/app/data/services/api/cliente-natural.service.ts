import { Injectable } from '@angular/core';
import {ApiClass} from '@data/schema/ApiClass.class';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {IclienteNatural, iClienteNaturalGuardar, iDireccionCNSend, iParentescoCNSend} from '@data/interfaces/icliente-natural';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '@data/constants/routes/api.routes';


@Injectable({
  providedIn: 'root'
})
export class ClienteNaturalService extends ApiClass {

  constructor(public http: HttpClient){
    super(http);
  }

  /**
   * Obtiene todos los clientes naturales
   */
  getAllClientesNaturales(): Observable<{
    error: boolean,
    msg: string,
    data: IclienteNatural[]
  }> {

    const response = {error: false, msg: '', data: [] as  IclienteNatural[] };

    return this.http.get <{clientes: IclienteNatural[]} > (API_ROUTES.CLIENTE_NATURAL.LISTA)
      .pipe(
          map( r =>  {
            response.data = r.clientes;
            return response;
          }),
        catchError((e) => of(response))
      );
  }

  getClientesNaturalesForStepperByIdCliente(idCliente:number): Observable<
  {
    error: boolean,
    msg: string,
    data: iClienteNaturalGuardar
  }>{
    const response = {error: false, msg: '', data: null as any };
    return this.http.get<iClienteNaturalGuardar>(`${API_ROUTES.CLIENTE_NATURAL.STEPPER}?fk_cliente=${idCliente}`).pipe(
      map(r => {
          response.data = r;
          return response;
        }
      ),
      catchError(() => of(response))
    );

  }


  getClienteByCedula(cedula: string): Observable<{
    error: boolean,
    msg: string,
    data: IclienteNatural
  }>{
    const response = {error: false, msg: '', data: null as any};
    return this.http.get<IclienteNatural>(`${API_ROUTES.CLIENTE_NATURAL.LISTA}?ruc=${cedula}`).pipe(
      map(r => {
          response.data = r;
          return response;
        }
      ),
      catchError(() => of(response))
    );
  }

  guardarClienteNaturalParentescoDireccion(
      clienteNaturalPyD: iClienteNaturalGuardar
  ): Observable<{
    error: boolean;
    msg: string;
    data: number
  }>{
    const response = {error: true, msg: '', data: null as any};
    return this.http.post<{cliente: number}>(API_ROUTES.CLIENTE_NATURAL.CLIENTE, clienteNaturalPyD)
    .pipe(
      map(r => {
        response.data = r.cliente;
        return response;
      }),
      catchError(() => of(response))
    );
  }

  getById(id: number): Observable<{ error: boolean, msg: string, data: any }> {

    const response = {error: false, msg: '', data: {
      cliente_natural: [] as  IclienteNatural[],
      direcciones: [] as  iDireccionCNSend[],
      parentesco: [] as iParentescoCNSend[]
    } };

    return this.http.get<{cliente_natural: IclienteNatural[], direcciones: iDireccionCNSend[], parentesco: iParentescoCNSend[]}> (API_ROUTES.CLIENTE_NATURAL.STEPPER+'?fk_cliente='+id)
      .pipe(
          map( r =>  {
            response.data.cliente_natural = r.cliente_natural;
            response.data.direcciones = r.direcciones;
            response.data.parentesco = r.parentesco;

            return response;
          }),
        catchError((e) => of(response))
      );
  }

  actualizarClienteNaturalParentescoDireccion(
    clienteNaturalPyD: iClienteNaturalGuardar
): Observable<{
  error: boolean;
  msg: string;
  data: any
}>{
  const response = {error: true, msg: '', data: null as any};
  return this.http.put<{respuesta: any}>(API_ROUTES.CLIENTE_NATURAL.STEPPER, clienteNaturalPyD)
  .pipe(
    map(r => {
      response.data = r.respuesta;
      return response;
    }),
    catchError(() => of(response))
  );
}

}
