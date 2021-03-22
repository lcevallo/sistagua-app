import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProvinciasService} from '@data/services/api/provincias.service';
import {IProvincias} from '@data/interfaces/i-provincias';
import {OficinasCeService} from '@data/services/api/oficinas-ce.service';
import {IOficinas} from '@data/interfaces/i-oficinas';


@Component({
  selector: 'app-cliente-empresarial-list-oficina',
  templateUrl: './cliente-empresarial-list-oficina.component.html',
  styleUrls: ['./cliente-empresarial-list-oficina.component.scss']
})
export class ClienteEmpresarialListOficinaComponent implements OnInit {

  oficinasForms: FormArray = this.fb.array([]);
  oficinasFormGroup: FormGroup[] = [];

  provincias: IProvincias[] = [];

  constructor(private fb: FormBuilder,
              private provinciaService: ProvinciasService,
              private oficinasCeService: OficinasCeService
    ) {

  }

  ngOnInit(): void {
      this.provinciaService.lista_provincias().subscribe(data => {
        this.provincias = data.provincias as [];
      });

      this.oficinasCeService.obtener(6).subscribe(
      res => {

        if (res.data.length == 0){
          // Si es que no hay ningun elemento me toca crear con la funcion addOficinasForm uno vacio
          this.addOficinasForm();
        }
        else{
          // Aqui me trae ya un array lleno
          // generate formarray as per the data received from Oficinas
          this.oficinasFormGroup = [];
          (res.data as []).forEach( (oficina: IOficinas, index) =>
                                                            {
                                                              this.oficinasForms.push(
                                                                this.fb.group(
                                                                  {
                                                                    id: [oficina.id],
                                                                    fkClienteEmpresa: [oficina.fk_cliente_empresarial],
                                                                    fkProvincia: [oficina.fk_provincia, Validators.min(1)],
                                                                    fkCanton: [oficina.fk_canton],
                                                                    fkParroquia: [oficina.fk_parroquia],
                                                                    sector: [oficina.sector],
                                                                    direccion: [oficina.direccion, Validators.required],
                                                                    telefono_convencional: [oficina.telefono_convencional]
                                                                  }
                                                                )
                                                              );

                                                              this.oficinasFormGroup.push( this.fb.group(
                                                                {
                                                                  id: [oficina.id],
                                                                  fkClienteEmpresa: [oficina.fk_cliente_empresarial],
                                                                  fkProvincia: [oficina.fk_provincia, Validators.min(1)],
                                                                  fkCanton: [oficina.fk_canton],
                                                                  fkParroquia: [oficina.fk_parroquia],
                                                                  sector: [oficina.sector],
                                                                  direccion: [oficina.direccion, Validators.required],
                                                                  telefono_convencional: [oficina.telefono_convencional]
                                                                }
                                                              )
                                                              );

                                                            }

                                );
        }
      }
    );
  }


  addOficinasForm(){

    let n = 0;
    if(this.oficinasFormGroup.length>0){
      n=this.oficinasFormGroup.length+1
    }

    this.oficinasForms.push(
      this.fb.group(
        {
          id: [0],
          fkClienteEmpresa: [1],
          fkProvincia: [0, Validators.min(1)],
          fkCanton: [0],
          fkParroquia: [0],
          sector: [''],
          direccion: ['', Validators.required],
          telefono_convencional: ['']
        }
      )
    );

    this.oficinasFormGroup[n] = this.fb.group(
      {
        id: [0],
        fkClienteEmpresa: [1],
        fkProvincia: [0, Validators.min(1)],
        fkCanton: [0],
        fkParroquia: [0],
        sector: [''],
        direccion: ['', Validators.required],
        telefono_convencional: ['']
      }
    );



  }


  recordSubmit(fg: FormGroup) {
    this.oficinasCeService.guardar(fg.value).subscribe(
      (res: any) => {
        fg.patchValue({id: res.data.id});
      }
    );
  }
}
