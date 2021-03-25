import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProvinciasService} from '@data/services/api/provincias.service';
import {IProvincias} from '@data/interfaces/i-provincias';
import {OficinasCeService} from '@data/services/api/oficinas-ce.service';
import {IOficinas} from '@data/interfaces/i-oficinas';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ActivatedRoute} from "@angular/router";
import { CiudadesService } from '@data/services/api/ciudades.service';
import { ICiudades } from '@data/interfaces/i-ciudades';


@Component({
  selector: 'app-cliente-empresarial-list-oficina',
  templateUrl: './cliente-empresarial-list-oficina.component.html',
  styleUrls: ['./cliente-empresarial-list-oficina.component.scss']
})
export class ClienteEmpresarialListOficinaComponent implements OnInit {

  oficinasForms: FormArray = this.fb.array([]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  notification: any= null;
  public id: number;


  provincias: IProvincias[] = [];
  ciudades: ICiudades[][] = [];

  l_ciudad: any;

  constructor(private fb: FormBuilder,
              private provinciaService: ProvinciasService,
              private ciudadesServices: CiudadesService,
              private oficinasCeService: OficinasCeService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar
    ) {
    this.id = +this.route.snapshot.params.id;
  }

  ngOnInit(): void {
      this.provinciaService.lista_provincias().subscribe(data => {
        this.provincias = data.provincias as [];
      });

      this.oficinasCeService.obtener(this.id).subscribe(
          res => {
            if (res.data.length == 0){
              // Si es que no hay ningun elemento me toca crear con la funcion addOficinasForm uno vacio
              this.addOficinaForm();
            }
            else{
              // Aqui me trae ya un array lleno
              // generate formarray as per the data received from Oficinas
              (res.data as []).forEach(async(oficina: IOficinas, index) => {
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

              });
           }
          }
    );

  }

  getCiudad(provinciaSeleccionada: number, fila: number) {
    this.ciudadesServices.lista_ciudades(provinciaSeleccionada)
      .subscribe( data => {
        this.ciudades[fila] = data['cantones'] as []
    });
  }


  onChangesProvincia(id: number, fg: FormGroup, index: number){
    this.getCiudad(id,index);
  }

  oficinas() : FormGroup[] {
    return this.oficinasForms.controls as FormGroup[];
  }

  nuevaOficina() {
    return this.fb.group(
      {
        id: [''],
        fkClienteEmpresa: [this.id],
        fkProvincia: ['', Validators.min(1)],
        fkCanton: [''],
        fkParroquia: [''],
        sector: [''],
        direccion: ['', Validators.required],
        telefono_convencional: ['']
      }
    );
  }

  addOficinaForm(){
    this.oficinas().push(this.nuevaOficina());
  }


  recordSubmit(fg: FormGroup) {
    if(fg.value.id==0){
      this.oficinasCeService.guardar(fg.value).subscribe(
        (res: any) => {
          // this.openSnackBar('Oficina guardada con exito');
          fg.patchValue({id: res.data.id});
          this.showNotification('insert');
        }
      );
    }
    else{
      this.oficinasCeService.actualizar(fg.value).subscribe(
        (res: any) => {
          // this.openSnackBar('Oficina actualizada con exito');
          this.showNotification('update');
        }
      );
    }
  }


  onDelete(oficinasID:number, i: number){

    if (oficinasID == 0){
      this.oficinasForms.removeAt(i);
    }
    else if(confirm('Esta seguro de borrar esta oficina?')){
      this.oficinasCeService.deleteOficina(oficinasID).subscribe(
        res => {
          if(res.data == ''){
            // this.openSnackBar('Oficina eliminada con exito');
            this.showNotification('delete');
            this.oficinasForms.removeAt(i);
          } else{
            this.openSnackBar(res.data);
          }
        }
      );
    }
  }


  openSnackBar(mensaje: string) {
    this.snackBar.open(`${mensaje}`, 'Finalizado', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  showNotification(category: string): void{
    switch(category){
      case 'insert':
        this.notification = {class: 'text-success', message: 'guardado!' };
        break;
      case 'update':
        this.notification = {class: 'text-primary', message: 'updated!' };
        break;
      case 'delete':
        this.notification = {class: 'text-danger', message: 'deleted!!' };
        break;
    }
    setTimeout(() => {
      this.notification=null;
    }, 3000);
  }


}
