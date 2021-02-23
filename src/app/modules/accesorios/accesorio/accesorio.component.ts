import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAccesorios } from '@data/interfaces/i-accesorios';
import { AccesoriosService } from '@data/services/api/accesorios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-accesorio',
  templateUrl: './accesorio.component.html',
  styleUrls: ['./accesorio.component.scss']
})
export class AccesorioComponent implements OnInit {

  accesorioFormGroup!: FormGroup;
  accesorio: IAccesorios;
  id: number = 0;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private accesorioService: AccesoriosService) {
              this.id = this.route.snapshot.params.id;
              this.accesorio = { id: undefined, nombre: '',  descripcion: ''};

  }

  ngOnInit(): void {
    this.accesorioFormGroup = this.formBuilder.group({
      id: [this.accesorio.id],
      nombre: [this.accesorio.nombre, Validators.required],
      descripcion: [this.accesorio.descripcion],
      created_at: [this.accesorio.created_at],
      publish: [this.accesorio.publish],
      updated_at: [this.accesorio.updated_at],
    });
    if(this.id > 0) {
      this.accesorioService.getById(this.id)
        .subscribe(data => {

          this.accesorio = data.data as IAccesorios;
          console.log(this.accesorio);
          this.accesorioFormGroup.setValue(this.accesorio);
        });
    }

  }

  onSubmit(): void {

    if(!this.accesorioFormGroup.get('id')?.value){
      this.accesorioService.guardar(this.accesorioFormGroup.getRawValue())
      .subscribe(data => {
        if(!data.error){
          this.alertRespuesta(data.data.id as number, 'El Registro se Guardó con éxito');
        }
        else{
          this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
        }
      });
    } else {

      this.accesorioService.actualizar(this.accesorioFormGroup.getRawValue())
        .subscribe(data => {
          if(!data.error){
            this.alertRespuesta(data.data.id as number, 'El Registro se Actualizó con éxito')
          }
          else{
            this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
          }
        })
    }

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
