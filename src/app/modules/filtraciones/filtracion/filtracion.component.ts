import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IFiltraciones } from '@data/interfaces/ifiltraciones';
import { FiltracionesServices } from '@data/services/api/filtraciones.services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-filtracion',
  templateUrl: './filtracion.component.html',
  styleUrls: ['./filtracion.component.scss']
})
export class FiltracionComponent implements OnInit {

  filtroFormGroup!: FormGroup;
  filtro: IFiltraciones;
  id: number = 0;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private filtroService: FiltracionesServices) {

    this.id = this.route.snapshot.params.id;
    this.filtro = { id: undefined, nombre: '',  descripcion: ''};

  }

  ngOnInit(): void {
    this.filtroFormGroup = this.formBuilder.group({
      id: [this.filtro.id],
      nombre: [this.filtro.nombre, Validators.required],
      descripcion: [this.filtro.descripcion],
      created_at: [this.filtro.created_at],
      publish: [this.filtro.publish],
      updated_at: [this.filtro.updated_at],
    });
    if(this.id > 0) {
      this.filtroService.getById(this.id)
        .subscribe(data => {
          console.log(data);
          this.filtro = data.data as IFiltraciones;
          console.log(this.filtro);
          this.filtroFormGroup.setValue(this.filtro);
        });
    }
  }

  onSubmit(): void {

    if(!this.filtroFormGroup.get('id')?.value){
      this.filtroService.guardar(this.filtroFormGroup.getRawValue())
      .subscribe(data => {
        console.log(data);
        if(!data.error){
          this.alertRespuesta(data.data.id as number, 'El Registro se Guardó con éxito');
        }
        else{
          this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
        }
      });
    } else {

      this.filtroService.actualizar(this.filtroFormGroup.getRawValue())
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
