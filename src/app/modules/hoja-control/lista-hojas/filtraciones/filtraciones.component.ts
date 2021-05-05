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
    // Este es el arreglo de detalleItems aqui estoy tomando al que se selecciono para poner las filtraciones
    console.log(this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex]);
    this.service.itemIndex=this.data.detalleItemIndex;
    console.log(this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].filtraciones_list);
    this.service.refreshList();
  }
//#blue

  populateForm(selectedRecord: FiltracionDetail): void  {

    const objectoClonado = Object.assign({}, selectedRecord);
    console.log('Objeto clonado');

    console.log(objectoClonado);
    console.log('Fin de Objeto clonado');
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number){


  }

}
