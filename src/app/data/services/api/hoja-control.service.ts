import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_ROUTES } from '@data/constants/routes/api.routes';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {HojaControl} from '@data/schema/hoja-control.model';
import {HojaControlItems} from '@data/schema/hoja-control-items.model';
import { IHojaControlTmp } from '@data/interfaces/i-hoja-control-tmp';
import { FiltracionDetail } from '@data/schema/filtracion-detail.model';
import { AccesorioDetail } from '@data/schema/accesorio-detail.model';

@Injectable({
  providedIn: 'root'
})
export class HojaControlService {


  formData: HojaControl = new HojaControl();
  hojaControlItems: HojaControlItems[] = [];

  constructor(private http: HttpClient) {

   }

  saveOrUpdateHojaControl(): Observable<{
    error: boolean;
    msg: string;
    data: any
  }>{
    const response = {error: true, msg: '', data: null as any};
    const body = {
      ...this.formData,
      detalle: this.hojaControlItems
    };
    console.log(this.hojaControlItems);
    return this.http.post<{id: number}>(API_ROUTES.HOJA_CONTROL.LISTA, body)
      .pipe(
        map(r => {
          response.error = false;
          response.data = r.id;
          return response;
        }),
        catchError(() => of(response))
      );

  }

  deleteHojaControl(id: number): Observable<{
    error: boolean;
    msg: string;
    data: string }>
   {
    const response = {error: true, msg: '', data: ''};
    return this.http.delete<{message: string}>(API_ROUTES.HOJA_CONTROL.LISTA+`/${id}`)
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

  getHojasControlList(): Observable<{
    error: boolean, msg: string , data: IHojaControlTmp[]
  }>{

    const response = {error: false, msg: '', data: [] as IHojaControlTmp[] }

    return this.http.get<{hojas_control: IHojaControlTmp[] }>(API_ROUTES.HOJA_CONTROL.LISTA)
    .pipe(
      map( r =>  {
        response.data = r.hojas_control;
        return response;
      }),
      catchError((e) => of(response))
    );
  }


  getHojaControl(hojaControlId: number) : Observable<
  {
    error: boolean, msg: string, formData: HojaControl, itemDetalle: HojaControlItems[]
  }
  > {

    const response = {error: false, msg: '', formData: null as any, itemDetalle: [] as HojaControlItems[] };

    return this.http.get<{hoja_control:HojaControl ,itemDetale: HojaControlItems[]}>(API_ROUTES.HOJA_CONTROL.LISTA+`/${hojaControlId}`)
      .pipe(
        map( r =>  {
          response.formData = r.hoja_control,
          response.itemDetalle = r.itemDetale;
          return response;
        }),
        catchError((e) => of(response))
      );
    }


    obtenerFiltracionesXHojaControlDetalle(fkHjd:number):Observable<{
      error: boolean,
      msg: string,
      data: FiltracionDetail[]
    }>{
      const response = {error: false, msg: '', data: [] as  FiltracionDetail[] };
      return this.http.get<{hoja_control_detalle_filtracion: FiltracionDetail[]}>(API_ROUTES.HOJA_CONTROL.DETALLE_FILTRACIONES+fkHjd)
      .pipe(
      map( r =>  {
      response.data = r.hoja_control_detalle_filtracion;
      return response;
      }),
      catchError((e) => of(response))
      );

    }


    obtenerAccesoriosXHojaControlDetalle(fkHjd:number):Observable<{
      error: boolean,
      msg: string,
      data: AccesorioDetail[]
    }>{
      const response = {error: false, msg: '', data: [] as  AccesorioDetail[] };
      return this.http.get<{hoja_control_detalle_accesorio: AccesorioDetail[]}>(API_ROUTES.HOJA_CONTROL.DETALLE_ACCESORIOS+fkHjd)
      .pipe(
      map( r =>  {
      response.data = r.hoja_control_detalle_accesorio;
      return response;
      }),
      catchError((e) => of(response))
      );

    }
}
