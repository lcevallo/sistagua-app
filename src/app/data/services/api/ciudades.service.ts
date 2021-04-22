import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private readonly PATH_CIUDADES = '/cantones?id_provincia={provinciaId}';
  constructor(private http: HttpClient) { }

  lista_ciudades(id:number) {

    const url: string = env.baseUrl + this.PATH_CIUDADES.replace('{provinciaId}', String(id));

    return this.http.get<any>(url)
      .pipe(map( data => data)
      );
    // let data = await this.http.get<any>(url).toPromise();

    // return data;
  }
}
