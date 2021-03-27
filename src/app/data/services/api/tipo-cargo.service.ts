import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoCargoService {

  private readonly PATH_TIPO_CARGO = 'tipos-cargos';

  constructor(private http: HttpClient) { }

  listado() {

    const url: string = env.baseUrl + this.PATH_TIPO_CARGO;

    return this.http.get<any>(url)
      .pipe(map( data => data)
      );
  }
}
