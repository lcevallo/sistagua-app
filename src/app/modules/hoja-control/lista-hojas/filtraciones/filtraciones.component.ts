import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FiltracionDetail} from '@data/schema/filtracion-detail.model';
import {FiltracionDetailService} from '@data/services/api/filtracion-detail.service';
import { HojaControlService } from '@data/services/api/hoja-control.service';
import swal from 'sweetalert2';

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


    if(id > 0){

      alert('Este es el id:'+id);
      alert('Este es el fk hoja control detalle: '+this.data.hojaControlDetalleId);
      // TODO: Aqui debo de borrar en la base de datos


      swal.fire({
        title: 'Esta seguro?',
        text: 'No se puede revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!',
      }).then( (result) => {
          if(result.isConfirmed) {
            this.service.borrarFiltracionHCDetalle(id,this.data.hojaControlDetalleId).subscribe(
              res => { if(res.data == ''){
                            swal.fire('Borrado','La filtracion en este detalle ha sido eliminada con exito!');
                            this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].filtraciones_list.splice(index, 1);
                          }
              }
            )
          }
        } );

    }
    else{

      this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].filtraciones_list.splice(index, 1);
    }
  }

}
