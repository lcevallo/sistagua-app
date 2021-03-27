import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TipoCargoService} from "@data/services/api/tipo-cargo.service";
import {ItipoCargo} from "@data/interfaces/itipo-cargo";
import {ContactosCeService} from "@data/services/api/contactos-ce.service";
import {IOficinas} from "@data/interfaces/i-oficinas";
import {IContactos} from "@data/interfaces/i-contactos";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cliente-empresarial-list-cargos',
  templateUrl: './cliente-empresarial-list-cargos.component.html',
  styleUrls: ['./cliente-empresarial-list-cargos.component.scss']
})
export class ClienteEmpresarialListCargosComponent implements OnInit {

  cargosForms: FormArray = this.fb.array([]);
  public id: number;
  notification: any= null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  tipos_cargos: ItipoCargo[]=[];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private tipoCargoService: TipoCargoService,
              private contactosCeService:ContactosCeService,
              private snackBar: MatSnackBar
              )
  {
    this.id = +this.route.snapshot.params.id;
  }

  ngOnInit(): void {

    this.tipoCargoService.listado().subscribe(
        data => {
          this.tipos_cargos = data.tipos_cargos as [];
        }
      );
    this.contactosCeService.obtener(this.id).subscribe(
        res =>{
                      if (res.data.length == 0){
                        this.addContactoForm();
                      }
                      else{
                        (res.data as []).forEach(
                          async(contacto: IContactos, index) =>{
                            this.cargosForms.push(
                                                    this.fb.group(
                                                      {
                                                                  id: [contacto.id],
                                                                  fkClienteEmpresa: [contacto.fk_cliente_empresarial],
                                                                  fkCargo: [contacto.fk_cargo],
                                                                  fkTipoCargo: [contacto.fk_tipo_cargo],
                                                                  apellidos: [contacto.apellidos, Validators.required],
                                                                  nombres: [contacto.nombres, Validators.required],
                                                                  celular: [contacto.celular, Validators.required],
                                                                  correo: [contacto.correo],
                                                                  cumple: [contacto.cumple]
                                                                }
                                                                )
                                                )
                                                                        }
                                              ); //fin del foreach
                      }// fin del else
              }

      );
  }


  addContactoForm(){
    this.contactos().push(this.nuevoContacto());
  }

  contactos() : FormGroup[] {
    return this.cargosForms.controls as FormGroup[];
  }

  nuevoContacto(): FormGroup {
    return this.fb.group(
      {
        id: [0],
        fkClienteEmpresa: [this.id],
        fkCargo: [0],
        fkTipoCargo: ['', Validators.min(1)],
        apellidos: ['', Validators.required],
        nombres: ['', Validators.required],
        celular: ['', Validators.required],
        correo: [''],
        cumple: ['']
      }
    );
  }

  recordSubmit(fg: FormGroup): void {
    if (fg.value.id == 0 ) {
      this.contactosCeService.guardar(fg.value).subscribe(
        (res: any) => {
          // this.openSnackBar('Oficina guardada con exito');
          fg.patchValue({id: res.data.id});
          fg.patchValue({fkCargo: res.data.fk_cargo});
          this.showNotification('insert');
        }
      );

    }
    else{
      this.contactosCeService.actualizar(fg.value).subscribe(
        (res: any) => {
          // this.openSnackBar('Oficina actualizada con exito');
          this.showNotification('update');
        }
      );

    }
  }

  onDelete(contactoId:number, cargoId: number, i: number){
    if (contactoId == 0){
      this.cargosForms.removeAt(i);
    }
    else if(confirm('Esta seguro de borrar este contacto?')) {
      this.contactosCeService.deleteContacto(contactoId,cargoId).subscribe(
        res => {
          if(res.data == ''){
            this.showNotification('delete');
            this.cargosForms.removeAt(i);
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
        this.notification = {class: 'text-success font-weight-bold', message: 'Guardado!' };
        break;
      case 'update':
        this.notification = {class: 'text-primary font-weight-bold h5', message: 'Actualizado!' };
        break;
      case 'delete':
        this.notification = {class: 'text-danger font-weight-bold', message: 'Eliminado!!' };
        break;
    }
    setTimeout(() => {
      this.notification=null;
    }, 3000);
  }

}
