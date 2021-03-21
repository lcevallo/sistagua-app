import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProvinciasService} from "@data/services/api/provincias.service";
import {IProvincias} from "@data/interfaces/i-provincias";
import {OficinasCeService} from "@data/services/api/oficinas-ce.service";

@Component({
  selector: 'app-cliente-empresarial-list-oficina',
  templateUrl: './cliente-empresarial-list-oficina.component.html',
  styleUrls: ['./cliente-empresarial-list-oficina.component.scss']
})
export class ClienteEmpresarialListOficinaComponent implements OnInit {

  oficinasForms : FormArray = this.fb.array([]);
  oficinasFormGroup!: FormGroup;
  provincias: IProvincias[] = [];

  constructor(private fb: FormBuilder,
    private provinciaService: ProvinciasService,
    private oficinasCeService:OficinasCeService
    ) { }

  ngOnInit(): void {
    this.provinciaService.lista_provincias().subscribe(data => {
      this.provincias = data['provincias'] as [];
    });
    this.addOficinasForm();
  }

  addOficinasForm(){

    this.oficinasFormGroup =  this.fb.group(
      {
        id:[0],
        fkClienteEmpresa:[0],
        fkProvincia:[0, Validators.min(1)],
        fkCanton:[0],
        fkParroquia:[0],
        sector:[''],
        direccion:['', Validators.required],
        telefono_convencional:['']
      }
    );
    this.oficinasForms.push(this.oficinasFormGroup)
  }

  recordSubmit(fg: FormGroup) {

    console.log(fg.value);

    this.oficinasCeService.guardar(fg.value).subscribe(
      (res: any) =>{
        fg.patchValue({id: res.data.id})
      }
    )
  }
}
