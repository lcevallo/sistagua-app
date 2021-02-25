import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IFichaTecnica } from '@data/interfaces/i-ficha-tecnica';
import { IclienteNatural } from '@data/interfaces/icliente-natural';
import { ClienteNaturalService } from '@data/services/api/cliente-natural.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import swal from 'sweetalert2';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {

  fichaFormGroup!: FormGroup;
  fichaTecnica: IFichaTecnica;
  clientes: IclienteNatural[] = [];
  filteredOptions!: Observable<IclienteNatural[]>;
  constructor(private formBuilder: FormBuilder,
              private clienteNaturalServices: ClienteNaturalService,
              private route: ActivatedRoute) {

    this.fichaTecnica = { id: undefined, fk_cliente: undefined, tipo_cliente: '', codigo: '', tds: undefined, ppm: undefined,
                          visitas: undefined, fecha_comprado: '', created_at:'', updated_at:'', publish:true
                      };
    this.clienteNaturalServices.getAllClientesNaturales()
      .subscribe( r => {
        if (!r.error) {
          this.clientes = r.data as IclienteNatural[];
          console.log(this.clientes)
        }
      })
  }

  ngOnInit(): void {
    this.filteredOptions = this.fichaFormGroup.get('fk_cliente')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    this.fichaFormGroup = this.formBuilder.group({
      id: [this.fichaTecnica.id],
      fk_cliente: [this.fichaTecnica.fk_cliente, Validators.required],
      tipo_cliente: [this.fichaTecnica.tipo_cliente],
      codigo: [this.fichaTecnica.codigo],
      tds: [this.fichaTecnica.tds],
      ppm: [this.fichaTecnica.ppm],
      visitas: [this.fichaTecnica.visitas],
      fecha_comprado: [this.fichaTecnica.fecha_comprado],
      created_at: [this.fichaTecnica.created_at],
      publish: [this.fichaTecnica.publish],
      updated_at: [this.fichaTecnica.updated_at],
    });
  }

  private _filterGroup(value: string): IclienteNatural[] {
    if (value) {
      return this.clientes
        .map(group => ({id: group.id, codigo: group.codigo, ruc: group.ruc, nombre1: _filter(group.nombre1, value), nombre2: group.nombre2,
                     apellido1: group.apellido1, apellido2: group.apellido2, correo: group.correo, celular: group.celular,
                     cumple: group.cumple, foto: group.foto, publish: group.publish}))
        .filter(group => group.nombre1.length > 0);
    }

    return this.clientes;
  }


  onSubmit(): void {

    /*if(!this.fichaFormGroup.get('id')?.value){
      this.accesorioService.guardar(this.fichaFormGroup.getRawValue())
      .subscribe(data => {
        if(!data.error){
          this.alertRespuesta(data.data.id as number, 'El Registro se Guardó con éxito');
        }
        else{
          this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
        }
      });
    } else {

      this.accesorioService.actualizar(this.fichaFormGroup.getRawValue())
        .subscribe(data => {
          if(!data.error){
            this.alertRespuesta(data.data.id as number, 'El Registro se Actualizó con éxito')
          }
          else{
            this.alertRespuesta(0, 'Ocurrió un error intente mas tarde');
          }
        })
    }*/
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
