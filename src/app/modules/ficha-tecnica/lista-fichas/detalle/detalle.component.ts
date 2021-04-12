import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FichaTecnicaItems} from '@data/schema/ficha-tecnica-items.model';
import {FichaTecnicaService} from '@data/services/api/ficha-tecnica.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  formData: FichaTecnicaItems = new FichaTecnicaItems();
  isValid = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetalleComponent>,
    public service: FichaTecnicaService
  ) { }

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

  onSubmit(form): void{
      this.dialogRef.close();
  }

}
