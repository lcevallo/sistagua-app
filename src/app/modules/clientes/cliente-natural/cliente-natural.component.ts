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
  clienteFormGroup!: FormGroup;
  direccionFormGroup!: FormGroup;
  parentescoFormGroup!: FormGroup;
  provincias: IProvincias[] = [];
  ciudades: ICiudades[] = [];
  parroquias: IParroquias[] = [];
  clienteNatural: iClienteNaturalSend[] = [];
  direccionesCN: iDireccionCNSend[] = [];
  parentescoCN: iParentescoCNSend[] = [];
  clienteGuardar!: iClienteNaturalGuardar;
  tipos: string[] = [];
  id: number = 0;

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private provinciaService: ProvinciasService,
              private ciudadesServices: CiudadesService,
              private parroquiasServices: ParroquiasService,
              private clienteNaturalServices: ClienteNaturalService) {

    this.id = this.route.snapshot.params.id;
    this.clienteNatural = [{id: undefined, codigo: '', ruc: '', nombre1: '', nombre2: '', apellido1: '',
                            apellido2: '', correo: '', celular: '', cumple: '', foto: '', publish: true}];
    this.parentescoCN = [{id: undefined, fk_cliente: 0, tipo_parentesco: '', sexo: '', nombre1: '', nombre2: '', apellido1: '',
                          apellido2: '', celular: '', correo: '', cumple: ''}];
    this.direccionesCN = [{id: undefined, fk_cliente: 0, fk_provincia: 0, fk_canton: 0, fk_parroquia: 0, direccion_domiciliaria: '',
                          direccion_oficina: '', telefono_convencional: '', publish: true}]
    this.tipos = ['Esposo', 'esposa', 'Papá', 'Mamá', 'hijo'];
  }

  ngOnInit(): void {

    this.clienteFormGroup = this._formBuilder.group({
      id: [this.clienteNatural[0].id],
      codigo: [this.clienteNatural[0].codigo, Validators.required],
      ruc: [this.clienteNatural[0].ruc, Validators.required],
      nombre1: [this.clienteNatural[0].nombre1, Validators.required],
      nombre2: [this.clienteNatural[0].nombre2],
      apellido1: [this.clienteNatural[0].apellido1, Validators.required],
      apellido2: [this.clienteNatural[0].apellido2],
      correo: [this.clienteNatural[0].correo],
      celular: [this.clienteNatural[0].celular, Validators.required],
      cumple: [this.clienteNatural[0].cumple],
      foto: [this.clienteNatural[0].foto],
      publish: [this.clienteNatural[0].publish]
    });

    this.direccionFormGroup = this._formBuilder.group({
      id: [this.direccionesCN[0].id],
      fk_cliente: [this.direccionesCN[0].fk_cliente],
      fk_provincia: [this.direccionesCN[0].fk_provincia, Validators.required],
      fk_canton: [this.direccionesCN[0].fk_canton, Validators.required],
      fk_parroquia: [this.direccionesCN[0].fk_parroquia],
      direccion_domiciliaria: [this.direccionesCN[0].direccion_domiciliaria, Validators.required],
      direccion_oficina: [this.direccionesCN[0].direccion_oficina],
      telefono_convencional: [this.direccionesCN[0].telefono_convencional],
      publish: [this.direccionesCN[0].publish]
    });

    this.parentescoFormGroup = this._formBuilder.group({
      id: [this.parentescoCN[0].id],
      fk_cliente: [this.parentescoCN[0].fk_cliente],
      tipo_parentesco: [this.parentescoCN[0].tipo_parentesco, Validators.required],
      sexo: [this.parentescoCN[0].sexo],
      nombre1: [this.parentescoCN[0].nombre1, Validators.required],
      nombre2: [this.parentescoCN[0].nombre2],
      apellido1: [this.parentescoCN[0].apellido1, Validators.required],
      apellido2: [this.parentescoCN[0].apellido2],
      celular: [this.parentescoCN[0].celular],
      correo: [this.parentescoCN[0].correo],
      cumple: [this.parentescoCN[0].cumple]
    });

    if(this.id > 0) {
      this.clienteNaturalServices.getById(this.id)
        .subscribe(data => {
          console.log(data.data);
          this.clienteNatural = JSON.parse(data.data.cliente_natural) as iClienteNaturalSend[];
          this.clienteFormGroup.setValue(this.clienteNatural);

          this.direccionesCN = JSON.parse(data.data.direcciones) as iDireccionCNSend[];
          this.direccionFormGroup.setValue(this.direccionesCN);

          this.parentescoCN = JSON.parse(data.data.parentesco) as iParentescoCNSend[];
          this.parentescoFormGroup.setValue(this.parentescoCN);

        });
    }

    this.provinciaService.lista_provincias().subscribe(data => {
      this.provincias = data['provincias'] as [];
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
    this.direccionFormGroup.get('fk_provincia')?.valueChanges
      .subscribe(provinciaSeleccionada => {
        this.direccionFormGroup.get('fk_canton')?.reset();
        this.getCiudad(provinciaSeleccionada);
      });

    this.direccionFormGroup.get('fk_canton')?.valueChanges
      .subscribe(ciudadSeleccionada => {
        this.direccionFormGroup.get('fk_parroquia')?.reset();
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


      //console.log(this.clienteGuardar);
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
