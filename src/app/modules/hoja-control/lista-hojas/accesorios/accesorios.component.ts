import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesorioDetail } from '@data/schema/accesorio-detail.model';
import { AccesorioDetailService } from '@data/services/api/accesorio-detail.service';
import { HojaControlService } from '@data/services/api/hoja-control.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.scss']
})
export class AccesoriosComponent implements OnInit {

  /**
   *
   * @param data : Que tiene
   * detalleItemIndex: Que es el indice del array
   * hojaControlDetalleId: Que es la fk de hoja control detall item
   * hojaControlId: que es el id de toda la hoja de control
   * fks_hc_detalle: un arreglo de los ids de las fk de hoja control detalle
   * this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex]   *
   * @param dialogRef
   * @param serviceHojaControl
   * @param service
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AccesoriosComponent>,
    public serviceHojaControl: HojaControlService,
    public service:AccesorioDetailService
  ) { }

  ngOnInit(): void {
    if (this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].accesorios_list === undefined) {

      this.serviceHojaControl.obtenerAccesoriosXHojaControlDetalle(this.data.hojaControlDetalleId).subscribe(
        response => {
          this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].accesorios_list = response.data as AccesorioDetail[];
        }
      )
    }
  }


  populateForm(selectedRecord: AccesorioDetail, indice: number): void  {
    this.service.arrayId=indice;
    this.service.formData = Object.assign({}, selectedRecord);

  }



  onDelete(id: number, index: number){


    if(id > 0){

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
            this.service.borrarAccesorioHCDetalle(id,this.data.hojaControlDetalleId).subscribe(
              res => { if(res.data == ''){
                            swal.fire('Borrado','El Accesorio en este detalle ha sido eliminada con exito!');
                            this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].accesorios_list.splice(index, 1);
                          }
              }
            )
          }
        } );

    }
    else{

      this.serviceHojaControl.hojaControlItems[this.data.detalleItemIndex].accesorios_list.splice(index, 1);
    }
  }

}
