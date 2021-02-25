import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IFichaTecnica } from '@data/interfaces/i-ficha-tecnica';
import swal from 'sweetalert2';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {

  fichaFormGroup!: FormGroup;
  fichaTecnica: IFichaTecnica;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute) {

    this.fichaTecnica = { id: undefined, fk_cliente: undefined, tipo_cliente: '', codigo: '', tds: 0, ppm: 0,
                          visitas: 0, fecha_comprado: '', created_at:'', updated_at:'', publish:true
                      };
  }

  ngOnInit(): void {
    this.fichaFormGroup = this.formBuilder.group({
      id: [this.fichaTecnica.id],
      fk_cliente: [this.fichaTecnica.fk_cliente, Validators.required],
      tipo_cliente: [this.fichaTecnica.tipo_cliente],
      codigo: [this.fichaTecnica.codigo],
      tds: [this.fichaTecnica.tds],
      ppm: [this.fichaTecnica.ppm],
      visitas: [this.fichaTecnica.visitas],
      fecha_comprado: [this.fichaTecnica.fecha_comprado],
      created_at: [this.fichaTecnica.created_at],
      publish: [this.fichaTecnica.publish],
      updated_at: [this.fichaTecnica.updated_at],
    });
  }

  onSubmit(): void {

    /*if(!this.fichaFormGroup.get('id')?.value){
      this.accesorioService.guardar(this.fichaFormGroup.getRawValue())
      .subscribe(data => {
        if(!data.error){
          this.alertRespuesta(data.data.id as number, 'El Registro se Guardó con éxito');
        }
        else{
          this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
        }
      });
    } else {

      this.accesorioService.actualizar(this.fichaFormGroup.getRawValue())
        .subscribe(data => {
          if(!data.error){
            this.alertRespuesta(data.data.id as number, 'El Registro se Actualizó con éxito')
          }
          else{
            this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
          }
        })
    }*/
  }

  alertRespuesta(id: number, message: string) {
    if (id > 0) {
      swal.fire({
        icon: 'success',
        title: `${message}`,
        confirmButtonText: 'Ok',
      })
    } else {
      swal.fire({
        icon: 'error',
        title: `${message}`,
        confirmButtonText: 'Cerrar',
      })
    }
  }

}
