import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICiudades } from '@data/interfaces/i-ciudades';
import { IParroquias } from '@data/interfaces/i-parroquias';
import { IProvincias } from '@data/interfaces/i-provincias';
import { iCargo, IclienteEmpresarial, iClienteEmpresarialSend, iDireccionEmpresarial } from '@data/interfaces/icliente-empresarial';
import { ItipoCargo } from '@data/interfaces/itipo-cargo';
import { CiudadesService } from '@data/services/api/ciudades.service';
import { ClienteEmpresarialService } from '@data/services/api/cliente-empresarial.service';
import { ParroquiasService } from '@data/services/api/parroquias.service';
import { ProvinciasService } from '@data/services/api/provincias.service';
import { TipoCargoService } from '@data/services/api/tipo-cargo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-empresarial',
  templateUrl: './cliente-empresarial.component.html',
  styleUrls: ['./cliente-empresarial.component.scss']
})
export class ClienteEmpresarialComponent implements OnInit {

  clienteFormGroup!: FormGroup;
  clienteEmpresarial: IclienteEmpresarial;
  clienteEmpresarialGuardar!: iClienteEmpresarialSend;
  direccionEmpresarialArray: iDireccionEmpresarial[] = [];
  direccionEmpresarial!: iDireccionEmpresarial;
  cargoEmpresarialArray: iCargo[] = [];
  cargoEmpresarial!: iCargo;
  provincias: IProvincias[] = [];
  ciudades: ICiudades[] = [];
  parroquias: IParroquias[] = [];
  tipoCargo: ItipoCargo[] = [];
  id: number = 0;
  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private provinciaService: ProvinciasService,
              private ciudadesServices: CiudadesService,
              private parroquiasServices: ParroquiasService,
              private tipoCargoServices: TipoCargoService,
              private clienteEmpresarialServices: ClienteEmpresarialService) {

    this.id = this.route.snapshot.params.id;
    this.clienteEmpresarial = {id: undefined, codigo: '', ruc: '', nombres: '',
                            direccion: '', telefono: '', correo: '', publish: true};

    this.direccionEmpresarial = {id: undefined, fk_cliente_empresarial: 0, fk_provincia: 0, fk_canton: 0,
                                fk_parroquia: 0, sector: '', direccion: '', telefono_convencional: '',
                                nombre_provincia: '', nombre_ciudad:'', nombre_parroquia:''};

    this.cargoEmpresarial = {id: undefined, fk_tipo_cargo: 0, nombres:'', apellidos: '', celular:'',
                              correo: '', cumple:'', publish: true, nombre_tipo_cargo: ''};
  }

  ngOnInit(): void {
    this.clienteFormGroup = this._formBuilder.group({
      id: [this.clienteEmpresarial.id],
      codigo: [this.clienteEmpresarial.codigo, Validators.required],
      ruc: [this.clienteEmpresarial.ruc, Validators.required],
      nombres: [this.clienteEmpresarial.nombres, Validators.required],
      direccion: [this.clienteEmpresarial.direccion],
      telefono: [this.clienteEmpresarial.telefono],
      correo: [this.clienteEmpresarial.correo],
      publish: [this.clienteEmpresarial.publish],
      direccionFormGroup: this._formBuilder.group({
        id: [this.direccionEmpresarial.id],
        fk_cliente_empresarial: [this.direccionEmpresarial.fk_cliente_empresarial],
        fk_provincia: [this.direccionEmpresarial.fk_provincia, Validators.required],
        fk_canton: [this.direccionEmpresarial.fk_canton, Validators.required],
        fk_parroquia: [this.direccionEmpresarial.fk_parroquia],
        sector: [this.direccionEmpresarial.sector, Validators.required],
        direccion: [this.direccionEmpresarial.direccion],
        telefono_convencional: [this.direccionEmpresarial.telefono_convencional],
        nombre_provincia: [this.direccionEmpresarial.nombre_provincia],
        nombre_ciudad: [this.direccionEmpresarial.nombre_ciudad],
        nombre_parroquia: [this.direccionEmpresarial.nombre_parroquia]
      }),
      cargosFormGroup: this._formBuilder.group({
        id: [this.cargoEmpresarial.id],
        fk_tipo_cargo: [[this.cargoEmpresarial.fk_tipo_cargo], Validators.required],
        nombres: [[this.cargoEmpresarial.nombres], Validators.required],
        apellidos: [[this.cargoEmpresarial.apellidos], Validators.required],
        celular: [this.cargoEmpresarial.celular],
        correo: [this.cargoEmpresarial.correo],
        cumple: [this.cargoEmpresarial.cumple],
        publish: [this.cargoEmpresarial.publish],
        nombre_tipo_cargo: [this.cargoEmpresarial.nombre_tipo_cargo]
      })
    });

    this.provinciaService.lista_provincias().subscribe(data => {
      this.provincias = data['provincias'] as [];
    });

    this.tipoCargoServices.listado()
      .subscribe( data => {
        this.tipoCargo = data['tipos_cargos'] as [];
      })

    this.onChanges();
  }

  onChanges() {
    this.clienteFormGroup.get('direccionFormGroup')?.get('fk_provincia')?.valueChanges
      .subscribe( idProvincia => {
        console.log(idProvincia);
        const provincia = this.provincias.filter(p => p.id == idProvincia);
        this.clienteFormGroup.get('direccionFormGroup')?.get('nombre_provincia')?.setValue(provincia[0].provincia);

        this.getCiudad(idProvincia);
      });

    this.clienteFormGroup.get('direccionFormGroup')?.get('fk_canton')?.valueChanges
      .subscribe(idCiudad => {
        console.log(idCiudad);
        const ciudad = this.ciudades.filter(c => c.id == idCiudad);
        this.clienteFormGroup.get('direccionFormGroup')?.get('nombre_ciudad')?.setValue(ciudad[0].canton);
        this.getParroquia(idCiudad);
      });

    this.clienteFormGroup.get('direccionFormGroup')?.get('fk_parroquia')?.valueChanges
      .subscribe(idParroquia => {
        console.log(idParroquia);
        const parroquias = this.parroquias.filter(c => c.id == idParroquia);
        this.clienteFormGroup.get('direccionFormGroup')?.get('nombre_parroquia')?.setValue(parroquias[0].parroquia);
      });

    this.clienteFormGroup.get('cargosFormGroup')?.get('fk_tipo_cargo')?.valueChanges
      .subscribe(idCargo => {
        console.log(idCargo);
        const cargo = this.tipoCargo.filter(c => c.id == idCargo);
        this.clienteFormGroup.get('cargosFormGroup')?.get('nombre_tipo_cargo')?.setValue(cargo[0].tipo);
      });

  }

  registarDirecciones() {
    this.direccionEmpresarialArray.push(this.clienteFormGroup.get('direccionFormGroup')?.value);
    console.log(this.direccionEmpresarialArray);

  }
  registarContactos() {
    this.cargoEmpresarialArray.push(this.clienteFormGroup.get('cargosFormGroup')?.value);
    console.log(this.cargoEmpresarialArray);
  }
  onSubmit() {
    if(!this.clienteFormGroup.get('id')?.value){
      this.cargoEmpresarialArray.length == 0 ? this.registarContactos() : {} ;
      this.direccionEmpresarialArray.length == 0 ? this.registarDirecciones() : {} ;

      this.clienteEmpresarialGuardar = {
        cliente_empresarial: this.clienteFormGroup.getRawValue(),
        contactos: this.cargoEmpresarialArray,
        oficinas: this.direccionEmpresarialArray
      }

      this.clienteEmpresarialServices.guardar(this.clienteEmpresarialGuardar)
      .subscribe(data => {
        console.log(data.data);
        if(!data.error){
          this.alertRespuesta(data.data as number, 'El Registro se Guardó con éxito');
        }
        else{
          this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
        }
      });
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
