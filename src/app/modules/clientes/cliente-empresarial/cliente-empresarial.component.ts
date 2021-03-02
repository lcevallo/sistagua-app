import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICiudades } from '@data/interfaces/i-ciudades';
import { IParroquias } from '@data/interfaces/i-parroquias';
import { IProvincias } from '@data/interfaces/i-provincias';
import { IclienteEmpresarial, iDireccionEmpresarial } from '@data/interfaces/icliente-empresarial';
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
  direccionEmpresarial: iDireccionEmpresarial[] = [];
  provincias: IProvincias[] = [];
  ciudades: ICiudades[] = [];
  parroquias: IParroquias[] = [];
  id: number = 0;
  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private provinciaService: ProvinciasService,
              private ciudadesServices: CiudadesService,
              private parroquiasServices: ParroquiasService) {

    this.id = this.route.snapshot.params.id;
    this.clienteEmpresarial = {id: undefined, codigo: '', ruc: '', nombres: '',
                            direccion: '', telefono: '', correo: '', publish: true};

    this.direccionEmpresarial = [{id: undefined, fk_cliente_empresarial: 0, fk_provincia: 0, fk_canton: 0,
                                fk_parroquia: 0, sector: '', direccion: '', telefono_convencional: ''}];
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
      publish: [this.clienteEmpresarial.publish],
      direccionFormGroup: this._formBuilder.group({
        id: [this.direccionEmpresarial[0].id],
        fk_cliente_empresarial: [this.direccionEmpresarial[0].fk_cliente_empresarial],
        fk_provincia: [this.direccionEmpresarial[0].fk_provincia, Validators.required],
        fk_canton: [this.direccionEmpresarial[0].fk_canton, Validators.required],
        fk_parroquia: [this.direccionEmpresarial[0].fk_parroquia],
        sector: [this.direccionEmpresarial[0].sector, Validators.required],
        direccion: [this.direccionEmpresarial[0].direccion],
        telefono_convencional: [this.direccionEmpresarial[0].telefono_convencional]
      })
    });
    this.provinciaService.lista_provincias().subscribe(data => {
      this.provincias = data['provincias'] as [];
    });

    this.onChanges();
  }

  onChanges() {
    this.clienteFormGroup.get('direccionFormGroup')?.valueChanges
      .subscribe( direccion => {
        console.log(direccion.fk_provincia)
        //this.clienteFormGroup.get('fk_canton')?.reset();
        this.getCiudad(direccion.fk_provincia);
      });

    this.clienteFormGroup.get('direccionFormGroup')?.valueChanges
      .subscribe(direccion => {
        //this.clienteFormGroup.get('fk_parroquia')?.reset();
        this.getParroquia(direccion.fk_canton);
      });

  }

  onSubmit() {
    if(!this.clienteFormGroup.get('id')?.value){
      this.id = 1;
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
  editarEmpresa() {
    this.id = 0;
  }

  getCiudad(provinciaSeleccionada: number) {
    this.ciudadesServices.lista_ciudades(provinciaSeleccionada)
      .subscribe( data => {
        this.ciudades = data['cantones'] as [];
      });
  }

  getParroquia(ciuadadSeleccionada: number) {
    this.parroquiasServices.lista_parroquias(ciuadadSeleccionada)
      .subscribe( data => {
        this.parroquias = data['parroquias'] as [];
      });
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
