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

    return this.http.get<IclienteNatural[]>(this.url + '')
      .pipe(
          map( r =>  {
            response.data = r as IclienteNatural[];
            return response;
          }),
        catchError((e) => {return of(response); })
      );
  }
}
