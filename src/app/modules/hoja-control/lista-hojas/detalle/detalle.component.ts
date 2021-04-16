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
        cedula_dio_mantenimiento: '',
        cedula_receptor: '',
        created_at: '',
        descripcion: '',
        factura: '',
        fecha_mantenimiento: '',
        ficha_tecnica: '',
        firma_url: '',
        fk_ficha_tecnica: 0,
        id: 0,
        persona_dio_mantenimiento: '',
        persona_recepta: '',
        publish: true,
        recibo: '',
        updated_at: ''
      };
    }
  }

  onSubmit(form: NgForm): void{
    if ( this.data.detalleItemIndex === 0 ) {
      this.service.hojaControlItems.push(form.value);
    }

    this.dialogRef.close();
  }

}
