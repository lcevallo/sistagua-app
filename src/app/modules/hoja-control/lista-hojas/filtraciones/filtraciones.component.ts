import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FiltracionDetail} from '@data/schema/filtracion-detail.model';
import {FiltracionDetailService} from '@data/services/api/filtracion-detail.service';
import { HojaControlService } from '@data/services/api/hoja-control.service';

@Component({
  selector: 'app-filtraciones',
  templateUrl: './filtraciones.component.html',
  styleUrls: ['./filtraciones.component.scss']
})
export class FiltracionesComponent implements OnInit {


  /**
   *
   * @param data : Que tiene
   * detalleItemIndex: Que es el indice del array
   * hojaControlDetalleId: Que es la fk de hoja control detall item
   * hojaControlId: que es el id de toda la hoja de control
   * fks_hc_detalle: un arreglo de los ids de las fk de hoja control detalle
   * this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex]
   * @param dialogRef
   * @param service
   */
  //#blue
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FiltracionesComponent>,
    public serviceHojaControl: HojaControlService,
    public service: FiltracionDetailService) { }


  ngOnInit(): void {
    this.service.iniciarArreglo(this.data.fks_hc_detalle);
    this.service.itemIndex=this.data.detalleItemIndex;

    if (this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].filtraciones_list === undefined) {

      this.serviceHojaControl.obtenerFiltracionesXHojaControlDetalle(this.data.hojaControlDetalleId).subscribe(
        response => {
          this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].filtraciones_list = response.data as FiltracionDetail[];
        }
      )
    }
    else{
      console.log('No voy a llamar a llenar el arreglo de la base de datos');
    }
  }
//#blue

  populateForm(selectedRecord: FiltracionDetail, indice: number): void  {

    const objectoClonado = Object.assign({}, selectedRecord);
    this.service.arrayId=indice;

    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number, index: number){

    this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].filtraciones_list.splice(index, 1);

  }

}
