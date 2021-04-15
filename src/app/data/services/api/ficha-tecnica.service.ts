import { Injectable } from '@angular/core';
import {FichaTecnica} from '@data/schema/ficha-tecnica.model';
import {FichaTecnicaItems} from '@data/schema/ficha-tecnica-items.model';
import {HttpClient} from '@angular/common/http';
import { API_ROUTES } from '@data/constants/routes/api.routes';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FichaTecnicaService {
  

  formData: FichaTecnica = new FichaTecnica();
  fichaTecnicaItems: FichaTecnicaItems[] = [];

  constructor(private http: HttpClient) { }

  saveOrUpdateFichaTecnica(): Observable<{
    error: boolean;
    msg: string;
    data: any
  }>{
    const response = {error: true, msg: '', data: null as any};
    const body = {
      ...this.formData,
      detalle: this.fichaTecnicaItems
    };
    console.log(body);
    return this.http.post<{id: number}>(API_ROUTES.FICHA_TECNICA.MASTER_DETAILS,body)
    .pipe(
      map(r => {
        response.error = false;
        response.data = r.id;
        return response;
      }),
      catchError(() => of(response))
    );

  }



  getFichaTecnicaList() {
    // return this.http.get()
  }
}
