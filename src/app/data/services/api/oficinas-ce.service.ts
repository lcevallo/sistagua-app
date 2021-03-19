import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROUTES} from "@data/constants/routes";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

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
    return this.http.post<{oficina_ce: any}>(API_ROUTES.CLIENTE_EMPRESARIAL.OFICINAS, formData)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.oficina_ce;
          return response;
        }),
        catchError(() => of(response))
      );
  }
}
