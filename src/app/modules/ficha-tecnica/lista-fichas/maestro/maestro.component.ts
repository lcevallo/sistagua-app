import { Component, OnInit } from '@angular/core';
import {FichaTecnicaService} from '@data/services/api/ficha-tecnica.service';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DetalleComponent} from '@modules/ficha-tecnica/lista-fichas/detalle/detalle.component';
import {AccesoriosComponent} from '@modules/ficha-tecnica/lista-fichas/accesorios/accesorios.component';
import {FiltracionesComponent} from '@modules/ficha-tecnica/lista-fichas/filtraciones/filtraciones.component';
import { FichaTecnica } from '@data/schema/ficha-tecnica.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {

  isValid = true;

  constructor(
              private dialog: MatDialog,
              private dialogAccesorio: MatDialog,
              private dialogFiltracion: MatDialog,
              public service: FichaTecnicaService,
              private toaster: ToastrService,
              private router: Router,
              private  currentRoute: ActivatedRoute
              
              ) {
  }

  ngOnInit(): void {

    this.resetForm();

  }

  validateForm(): boolean {
    this.isValid = true;
    if (this.service.formData.codigo.length == 0)
      {
        this.isValid = false;
      }
    // else if (this.service.fichaTecnicaItems.length == 0)
    //   {
    //     this.isValid = false;
    //   }
    return this.isValid;
  }


  onSubmit(form: NgForm): void {
    if (this.validateForm()) {
        this.service.saveOrUpdateFichaTecnica().subscribe(res => {
                  this.resetForm();
                  this.toaster.success('Guardado exitoso!', 'Restaurant-APP');
                  this.router.navigate(['/ficha-tecnica/fichas-tecnicas']);
             }
        );
    }
}


  AddOrEditFichaTecnicaDetalle(detalleItemIndex: number, fichaTecnicaId: number): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    /**
     * Estos valores los pasare al componente Dialog: DetalleComponent
     */
    dialogConfig.data = {detalleItemIndex, fichaTecnicaId};
    /**
     * Despues de cerrar el dialogo que servira para seleccionar el item de comida actualizare el Grand Total
     */
    this.dialog.open(DetalleComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.accionAntesDeCerrar();
      }
    );

  }

  AddOrEditAccesorios(detalleItemIndex: number, fichaTecnicaId: number):void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';

    dialogConfig.data = {detalleItemIndex, fichaTecnicaId};

    this.dialogAccesorio.open(AccesoriosComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.accionAntesDeCerrar();
      }
    );

  }


  AddOrEditFiltraciones(detalleItemIndex: number, fichaTecnicaId: number):void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {detalleItemIndex, fichaTecnicaId};

    this.dialogFiltracion.open(FiltracionesComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.accionAntesDeCerrar();
      }
    );
  }


  onDeleteFichaDetalle(IdFichaTecnicaDetalle: number, i:number):void{
    if(IdFichaTecnicaDetalle != 0) {
      console.log(IdFichaTecnicaDetalle);
      // TODO: LLamar al servicio que debe de borrar solo el detalle Item de la ficha tecnica


    }

    this.service.fichaTecnicaItems.splice(i,1);    
  }

  resetForm(form?: NgForm): void {

    if (form) {
      form.form.reset();
    }

    this.service.formData = new FichaTecnica();

    this.service.fichaTecnicaItems = [];
  }

  private accionAntesDeCerrar(): void {

  }
}
