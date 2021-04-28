import { Injectable } from '@angular/core';
import { FiltracionDetail } from '@data/schema/filtracion-detail.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FiltracionDetailService {

  constructor(private http: HttpClient) { }
  formData: FiltracionDetail = new FiltracionDetail();
  itemIndex: number= 0;

  //#blue
  list: FiltracionDetail[][] = [];
//#blue
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
