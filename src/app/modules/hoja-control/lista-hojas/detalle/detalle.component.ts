import {Component, Inject, OnInit} from '@angular/core';
import {HojaControlItems} from '@data/schema/hoja-control-items.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HojaControlService} from '@data/services/api/hoja-control.service';
import {NgForm} from '@angular/forms';
import {format} from 'date-fns';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  formData: HojaControlItems = new HojaControlItems();
  isValid = true;

  /**
   *
   * @param data dialogConfig.data = {detalleItemIndex, hojaControlId}; Tengo el detalleItemIndex
   * @param dialogRef
   * @param service
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetalleComponent>,
    public service: HojaControlService)
  {

  }

  ngOnInit(): void {

    if (this.data.detalleItemIndex == null) {

      this.formData = {
        cedula_autoriza: '',
        cedula_dio_mantenimiento: '',
        created_at: '',
        descripcion: '',
        factura: '',
        fecha_mantenimiento:'',
        firma_url: '',
        fk_hoja_control: 0,
        hoja_control: '',
        id: 0,
        persona_autoriza: '',
        persona_dio_mantenimiento: '',
        ppm: 0,
        publish: false,
        recibo: '',
        tds: 0,
        updated_at: ''
      };
    } else {
      console.log('Veamos como trae los datos');
      console.log(this.service.hojaControlItems[this.data.detalleItemIndex]);
      this.formData = Object.assign({}, this.service.hojaControlItems[this.data.detalleItemIndex]);
    }
  }

  onSubmit(form: NgForm): void{
    form.value.fecha_mantenimiento=format(form.value.fecha_mantenimiento,'yyyy-MM-dd');

    if ( this.data.detalleItemIndex === -1 ) {

      this.service.hojaControlItems.push(form.value);
    } else {
      this.service.hojaControlItems[this.data.detalleItemIndex] = form.value;
    }

    this.dialogRef.close();
  }

  // onMonthSelect(event: any) {
  //   console.log(event);
  //   this.formData.fecha_mantenimiento = new Date(event.getFullYear(), event.getMonth(), 1).toISOString();
  // }



}
