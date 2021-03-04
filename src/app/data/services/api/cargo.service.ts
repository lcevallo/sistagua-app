import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private readonly PATH_CARGOS = '/cargos';

  constructor(private http: HttpClient) { }

  listado() {

    const url: string = env.baseUrl + this.PATH_CARGOS;

    return this.http.get<any>(url)
      .pipe(map( data => data)
      );
  }
}
