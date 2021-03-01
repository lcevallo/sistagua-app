import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IclienteEmpresarial } from '@data/interfaces/icliente-empresarial';
import { CiudadesService } from '@data/services/api/ciudades.service';
import { ParroquiasService } from '@data/services/api/parroquias.service';
import { ProvinciasService } from '@data/services/api/provincias.service';

@Component({
  selector: 'app-cliente-empresarial',
  templateUrl: './cliente-empresarial.component.html',
  styleUrls: ['./cliente-empresarial.component.scss']
})
export class ClienteEmpresarialComponent implements OnInit {

  clienteFormGroup!: FormGroup;
  clienteEmpresarial: IclienteEmpresarial[] = [];
  id: number = 0;
  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private provinciaService: ProvinciasService,
              private ciudadesServices: CiudadesService,
              private parroquiasServices: ParroquiasService) {

    this.id = this.route.snapshot.params.id;
    this.clienteEmpresarial = [{id: undefined, codigo: '', ruc: '', nombres: '',
                            apellido2: '', correo: '', celular: '', publish: true}];
  }

  ngOnInit(): void {
  }
  onSubmit() {

  }
}
