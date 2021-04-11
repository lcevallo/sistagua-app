import { Injectable } from '@angular/core';
import {FichaTecnica} from '@data/schema/ficha-tecnica.model';
import {FichaTecnicaItems} from '@data/schema/ficha-tecnica-items.model';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FichaTecnicaService {

  formData: FichaTecnica = new FichaTecnica();
  fichaTecnicaItems: FichaTecnicaItems[] = [];

  constructor(private http: HttpClient) { }
}
