import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    });
  }

  ngOnInit(): void {
    this.provinciaService.lista_provincias().subscribe(data => console.log(data));
  }

}
