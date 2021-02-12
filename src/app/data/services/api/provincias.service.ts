import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { IProvincias } from '@data/interfaces/i-provincias';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  private readonly PATH_PROVINCIAS = '/provincias';
  constructor(private http: HttpClient) { }

  lista_provincias() {

    const url: string = env.baseUrl + this.PATH_PROVINCIAS;

    return this.http.get<IProvincias>(url)
      .pipe(map( data => data)
      );
  }
}
