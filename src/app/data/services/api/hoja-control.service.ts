import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_ROUTES } from '@data/constants/routes/api.routes';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {HojaControl} from '@data/schema/hoja-control.model';
import {HojaControlItems} from '@data/schema/hoja-control-items.model';
import { IHojaControlTmp } from '@data/interfaces/i-hoja-control-tmp';

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
}
