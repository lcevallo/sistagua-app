import { Injectable } from '@angular/core';
import {ApiClass} from '@data/schema/ApiClass.class';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {IclienteNatural} from '@data/interfaces/icliente-natural';
import { HttpClient } from '@angular/common/http';

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

    return this.http.get<IclienteNatural[]>(this.url + '/clientes_naturales')
      .pipe(
          map( r =>  {
            response.data = r as IclienteNatural[];
            return response;
          }),
        catchError((e) => of(response))
      );
  }


  getClienteByCedula(cedula: string): Observable<{
    error: boolean,
    msg: string,
    data: IclienteNatural
  }>{
    const response = {error: false, msg: '', data: null as any};
    return this.http.get<IclienteNatural>(`${this.url}clientes_naturales?ruc=${cedula}`).pipe(
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
  ):Observable<{
    error: boolean;
    msg: string;
    data: any
  }>{
    const response = {error=true, msg:'', data: null};
    return this.http.post<{error: boolean, msg:string, data: any}>(clienteNaturalPyD)
    .pipe(
      map(r => {
        response.msg = r.msg;
        response.error = r.error;
        response.data = r.data;
        

      })
    )
  }

}
