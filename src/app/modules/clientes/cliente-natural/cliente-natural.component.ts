import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICiudades } from '@data/interfaces/i-ciudades';
import { IParroquias } from '@data/interfaces/i-parroquias';
import { IProvincias } from '@data/interfaces/i-provincias';
import { IclienteNatural, iClienteNaturalGuardar, iClienteNaturalSend, iDireccionCNSend, iParentescoCNSend } from '@data/interfaces/icliente-natural';
import { CiudadesService } from '@data/services/api/ciudades.service';
import { ClienteNaturalService } from '@data/services/api/cliente-natural.service';
import { ParroquiasService } from '@data/services/api/parroquias.service';
import { ProvinciasService } from '@data/services/api/provincias.service';
import * as moment from 'moment';
import swal from 'sweetalert2';
@Component({
  selector: 'app-cliente-natural',
  templateUrl: './cliente-natural.component.html',
  styleUrls: ['./cliente-natural.component.scss']
})
export class ClienteNaturalComponent implements OnInit {

  isLinear = true;
  clienteFormGroup: FormGroup;
  direccionFormGroup: FormGroup;
  parentescoFormGroup: FormGroup;
  provincias: IProvincias[] = [];
  ciudades: ICiudades[] = [];
  parroquias: IParroquias[] = [];
  clienteNatural: iClienteNaturalSend[] = [];
  direccionesCN: iDireccionCNSend[] = [];
  parentescoCN: iParentescoCNSend[] = [];
  clienteGuardar!: iClienteNaturalGuardar;
  datosCliente: any;
  id?: number;

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private provinciaService: ProvinciasService,
              private ciudadesServices: CiudadesService,
              private parroquiasServices: ParroquiasService,
              private clienteNaturalServices: ClienteNaturalService) {


    this.clienteFormGroup = this._formBuilder.group({
      codigo: ['', Validators.required],
      cedula: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      correo: [''],
      celular: ['', Validators.required],
      cumpleanos: [''],
    });
    this.direccionFormGroup = this._formBuilder.group({
      provincia_id: ['', Validators.required],
      ciudad_id: ['', Validators.required],
      parroquia_id: [''],
      direccion_domiciliaria: ['', Validators.required],
      direccion_oficina: [''],
      telefono_convencional: [''],
    });
    this.parentescoFormGroup = this._formBuilder.group({
      tipo_parentesco: ['', Validators.required],
      primer_nombre_parentesco: ['', Validators.required],
      segundo_nombre_parentesco: [''],
      primer_apellido_parentesco: ['', Validators.required],
      segundo_apellido_parentesco: [''],
      celular_parentesco: [''],
      picker_parentesco: ['']
    });
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    console.log(this.id);

    this.provinciaService.lista_provincias().subscribe(data => {
      this.provincias = data['provincias'] as [];
      console.log(this.provincias);
    });

    this.onChanges();
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

  onChanges() {
    this.direccionFormGroup.get('provincia_id')?.valueChanges
      .subscribe(provinciaSeleccionada => {
        this.direccionFormGroup.get('ciudad_id')?.reset();
        this.getCiudad(provinciaSeleccionada);
      });

    this.direccionFormGroup.get('ciudad_id')?.valueChanges
      .subscribe(ciudadSeleccionada => {
        this.direccionFormGroup.get('parroquia_id')?.reset();
        this.getParroquia(ciudadSeleccionada);
      });

  }

  onSubmit() {

    if (this.clienteFormGroup.valid && this.direccionFormGroup.valid) {

      let cumple = moment(this.clienteFormGroup.get('cumpleanos')?.value);
      let dia = String(cumple.date());
      let mes = String(cumple.month()+1);
      let anio = String(cumple.year());

      this.clienteNatural = [{
        codigo: this.clienteFormGroup.get('codigo')?.value,
        ruc: this.clienteFormGroup.get('cedula')?.value,
        apellido1: this.clienteFormGroup.get('primer_apellido')?.value,
        apellido2: this.clienteFormGroup.get('segundo_apellido')?.value,
        nombre1: this.clienteFormGroup.get('primer_nombre')?.value,
        nombre2: this.clienteFormGroup.get('segundo_nombre')?.value,
        celular: this.clienteFormGroup.get('celular')?.value,
        correo: this.clienteFormGroup.get('correo')?.value,
        cumple: anio+"-"+mes+"-"+dia,
        foto: ""
      }];
      this.parentescoCN = [{
        tipo_parentesco: this.parentescoFormGroup.get('tipo_parentesco')?.value,
        sexo: "",
        nombre1: this.parentescoFormGroup.get('primer_nombre_parentesco')?.value,
        nombre2: this.parentescoFormGroup.get('segundo_nombre_parentesco')?.value,
        apellido1: this.parentescoFormGroup.get('primer_apellido_parentesco')?.value,
        apellido2: this.parentescoFormGroup.get('segundo_apellido_parentesco')?.value,
        celular: this.parentescoFormGroup.get('celular_parentesco')?.value,
        correo: "",
        cumple: this.parentescoFormGroup.get('picker_parentesco')?.value
      }];
      this.direccionesCN = [{
        fk_provincia: this.direccionFormGroup.get('provincia_id')?.value,
        fk_canton: this.direccionFormGroup.get('ciudad_id')?.value,
        fk_parroquia: this.direccionFormGroup.get('parroquia_id')?.value,
        direccion_domiciliaria: this.direccionFormGroup.get('direccion_domiciliaria')?.value,
        direccion_oficina: this.direccionFormGroup.get('direccion_oficina')?.value,
        telefono_convencional: this.direccionFormGroup.get('telefono_convencional')?.value
      }];
      this.clienteGuardar = {
        cliente_natural: this.clienteNatural,
        direcciones: this.direccionesCN,
        parentesco: this.parentescoCN
      }


      console.log(this.clienteGuardar);
    }

  }

    done() {
      this.clienteNaturalServices.guardarClienteNaturalParentescoDireccion(this.clienteGuardar)
        .subscribe( data => {
          if (data.data > 0) {
            swal.fire({
              icon: 'success',
              title: 'El registro se guardó con éxito',
              confirmButtonText: 'Ok',
            })
          } else {
            swal.fire({
              icon: 'error',
              title: 'Intente nuevamente!',
              confirmButtonText: 'Cerrar',
            })
          }
        });
    }

}
