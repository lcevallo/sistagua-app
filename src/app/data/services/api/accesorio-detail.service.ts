import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes/api.routes';
import { IAccesorios } from '@data/interfaces/i-accesorios';
import { AccesorioDetail } from '@data/schema/accesorio-detail.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccesorioDetailService {

  formData: AccesorioDetail = new AccesorioDetail();
  arrayId: number=-1;
  constructor(private http: HttpClient) { }

  obtenerListaAccesorios(): Observable<{
    error: boolean,
    msg: string,
    data: IAccesorios[]
  }>
    {
        const response = {error: false, msg: '', data: [] as  IAccesorios[] };
        return this.http.get<{accesorios: IAccesorios[]}>(API_ROUTES.ACCESORIO.LISTA)
        .pipe(
        map( r =>  {
        response.data = r.accesorios;
        return response;
        }),
        catchError((e) => of(response))
        );
    } // fin del metodo obtener


    iniciarTodo(){
      this.formData= new AccesorioDetail();
    }

    borrarAccesorioHCDetalle(idAccesorio: number,fkHCDetalle: number): Observable<{
      error: boolean;
      msg: string;
      data: string }>
     {
      const response = {error: true, msg: '', data: ''};
      return this.http.delete<{message: string}>(API_ROUTES.HOJA_CONTROL.HCD_ACCESORIO+`/${idAccesorio}/${fkHCDetalle}`)
      .pipe(
        map(r => {
                    response.error = false;
                    response.data = r.message;
                    return response;
                  }),
        catchError(() => of(response))
      );

    }


}
