import { Injectable } from '@angular/core';
import { FiltracionDetail } from '@data/schema/filtracion-detail.model';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '@data/constants/routes/api.routes';
import { IFiltraciones } from '@data/interfaces/ifiltraciones';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FiltracionDetailService {

  constructor(private http: HttpClient) { }
  formData: FiltracionDetail = new FiltracionDetail();
  itemIndex: number= 0;
  arrayId: number=-1;

  //#blue
  list: FiltracionDetail[][] = [];
//#blue

  iniciarArreglo(ids: number[]): void{
    for(let i = 0; i < ids.length; i++){
      if (this.list[ids[i]-1]===undefined){
        this.list[ids[i]-1]=[];
      }
    }
  }

  iniciarTodo(){
    this.formData= new FiltracionDetail();
    this.itemIndex = 0;
    this.list= [];
  }


  obtenerListaFiltraciones(): Observable<{
    error: boolean,
    msg: string,
    data: IFiltraciones[]
  }>
    {
        const response = {error: false, msg: '', data: [] as  IFiltraciones[] };
        return this.http.get<{filtraciones: IFiltraciones[]}>(API_ROUTES.FILTRACION.LISTA)
        .pipe(
        map( r =>  {
        response.data = r.filtraciones;
        return response;
        }),
        catchError((e) => of(response))
        );
    } // fin del metodo obtener


  refreshList(){
    // this.http.get(this.)
    // .toPromise()
    // .then(res ==> this.list = res as FiltracionDetail[])


  }
  postFiltracionDetalle(){

    // return this.http.post(,this.formData);
  }

  putFiltracionDetalle() {
    // return this.http.put(,this.formData);
  }
}
