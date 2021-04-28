import {Component, Inject, OnInit} from '@angular/core';
import {HojaControlItems} from '@data/schema/hoja-control-items.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HojaControlService} from '@data/services/api/hoja-control.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  formData: HojaControlItems = new HojaControlItems();
  isValid = true;

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
        fecha_mantenimiento: '',
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
      this.formData = Object.assign({}, this.service.hojaControlItems[this.data.detalleItemIndex]);
    }
  }

  onSubmit(form: NgForm): void{

    if ( this.data.detalleItemIndex === -1 ) {
      this.service.hojaControlItems.push(form.value);
    } else {
      this.service.hojaControlItems[this.data.detalleItemIndex] = form.value;
    }

    this.dialogRef.close();
  }

}
