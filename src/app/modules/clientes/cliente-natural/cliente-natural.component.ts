import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IclienteNatural } from '@data/interfaces/icliente-natural';
import { ProvinciasService } from '@data/services/api/provincias.service';

@Component({
  selector: 'app-cliente-natural',
  templateUrl: './cliente-natural.component.html',
  styleUrls: ['./cliente-natural.component.scss']
})
export class ClienteNaturalComponent implements OnInit {

  isLinear = false;
  clienteFormGroup: FormGroup;
  direccionFormGroup: FormGroup;
  parentescoFormGroup: FormGroup;
  clienteNatural: IclienteNatural;

  constructor(private _formBuilder: FormBuilder,
              private provinciaService: ProvinciasService) {

    this.clienteFormGroup = this._formBuilder.group({
      codigo: ['', Validators.required],
      cedula: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      correo: ['', Validators.required],
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
    this.provinciaService.lista_provincias().subscribe(data => console.log(data));
  }

  getFormClienteNatural() {
    this.clienteNatural.cedula = this.clienteFormGroup.get('cedula')?.value;
    this.clienteNatural.codigo = this.clienteFormGroup.get('codigo')?.value;
    this.clienteNatural.primer_apellido = this.clienteFormGroup.get('primer_apellido')?.value;
    this.clienteNatural.segundo_apellido = this.clienteFormGroup.get('segundo_apellido')?.value;
    this.clienteNatural.primer_nombre = this.clienteFormGroup.get('primer_nombre')?.value;
    this.clienteNatural.segundo_nombre = this.clienteFormGroup.get('segundo_nombre')?.value;
    this.clienteNatural.celular = this.clienteFormGroup.get('celular')?.value;
    this.clienteNatural.correo = this.clienteFormGroup.get('correo')?.value;
    this.clienteNatural.cumpleanios = this.clienteFormGroup.get('cumpleanos')?.value;

    this.clienteNatural.provincia_id = this.direccionFormGroup.get('provincia_id')?.value;
    this.clienteNatural.ciudad_id = this.direccionFormGroup.get('ciudad_id')?.value;
    this.clienteNatural.parroquia_id = this.direccionFormGroup.get('parroquia_id')?.value;
    this.clienteNatural.direccion_domiciliaria = this.direccionFormGroup.get('direccion_domiciliaria')?.value;
    this.clienteNatural.direccion_oficina = this.direccionFormGroup.get('direccion_oficina')?.value;
    this.clienteNatural.telefono = this.direccionFormGroup.get('telefono_convencional')?.value;

    this.clienteNatural.tipo_parentesco_id = this.parentescoFormGroup.get('tipo_parentesco')?.value;
    this.clienteNatural.primer_nombre_parentesco = this.parentescoFormGroup.get('primer_nombre_parentesco')?.value;
    this.clienteNatural.segundo_nombre_parentesco = this.parentescoFormGroup.get('segundo_nombre_parentesco')?.value;
    this.clienteNatural.primer_apellido_parentesco = this.parentescoFormGroup.get('primer_apellido_parentesco')?.value;
    this.clienteNatural.segundo_apellido_parentesco = this.parentescoFormGroup.get('segundo_apellido_parentesco')?.value;
    this.clienteNatural.celular_parentesco = this.parentescoFormGroup.get('celular_parentesco')?.value;
    this.clienteNatural.cumpleanios_parentesco = this.parentescoFormGroup.get('picker_parentesco')?.value;



  }

}
