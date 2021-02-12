import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParroquiasService {

  private readonly PATH_PARROQUIAS = '/parroquias?id_canton={ciudadId}';
  constructor(private http: HttpClient) { }

  lista_parroquias(id:number) {

    const url: string = env.baseUrl + this.PATH_PARROQUIAS.replace('{ciudadId}', String(id));

    return this.http.get<any>(url)
      .pipe(map( data => data)
      );
  }
}
