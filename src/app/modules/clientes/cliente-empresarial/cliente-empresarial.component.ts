import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IclienteEmpresarial } from '@data/interfaces/icliente-empresarial';
import { CiudadesService } from '@data/services/api/ciudades.service';
import { ParroquiasService } from '@data/services/api/parroquias.service';
import { ProvinciasService } from '@data/services/api/provincias.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-empresarial',
  templateUrl: './cliente-empresarial.component.html',
  styleUrls: ['./cliente-empresarial.component.scss']
})
export class ClienteEmpresarialComponent implements OnInit {

  clienteFormGroup!: FormGroup;
  clienteEmpresarial: IclienteEmpresarial;
  id: number = 0;
  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private provinciaService: ProvinciasService,
              private ciudadesServices: CiudadesService,
              private parroquiasServices: ParroquiasService) {

    this.id = this.route.snapshot.params.id;
    this.clienteEmpresarial = {id: undefined, codigo: '', ruc: '', nombres: '',
                            direccion: '', telefono: '', correo: '', publish: true};
  }

  ngOnInit(): void {
    this.clienteFormGroup = this._formBuilder.group({
      id: [this.clienteEmpresarial.id],
      codigo: [this.clienteEmpresarial.codigo, Validators.required],
      ruc: [this.clienteEmpresarial.ruc, Validators.required],
      nombres: [this.clienteEmpresarial.nombres, Validators.required],
      direccion: [this.clienteEmpresarial.direccion],
      telefono: [this.clienteEmpresarial.telefono, Validators.required],
      correo: [this.clienteEmpresarial.correo],
      publish: [this.clienteEmpresarial.publish]
    });
  }
  onSubmit() {
    if(!this.clienteFormGroup.get('id')?.value){
      /*this.filtroService.guardar(this.clienteEmpresarial.getRawValue())
      .subscribe(data => {
        console.log(data);
        if(!data.error){
          this.alertRespuesta(data.data.id as number, 'El Registro se Guardó con éxito');
        }
        else{
          this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
        }
      });*/
    } else {

      /*this.filtroService.actualizar(this.filtroFormGroup.getRawValue())
        .subscribe(data => {
          if(!data.error){
            this.alertRespuesta(data.data.id as number, 'El Registro se Actualizó con éxito')
          }
          else{
            this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
          }
        })*/
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
