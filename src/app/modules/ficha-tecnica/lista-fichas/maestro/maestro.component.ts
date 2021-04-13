import { Component, OnInit } from '@angular/core';
import {FichaTecnicaService} from '@data/services/api/ficha-tecnica.service';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DetalleComponent} from '@modules/ficha-tecnica/lista-fichas/detalle/detalle.component';
import {AccesoriosComponent} from '@modules/ficha-tecnica/lista-fichas/accesorios/accesorios.component';
import {FiltracionesComponent} from '@modules/ficha-tecnica/lista-fichas/filtraciones/filtraciones.component';


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
              public service: FichaTecnicaService) {
  }

  ngOnInit(): void {

    this.resetForm();

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

  resetForm(form?: NgForm): void {

    if (form) {
      form.resetForm();
    }

    this.service.formData = {
      codigo: '',
      created_at: '',
      fecha_comprado: '',
      fk_cliente: 0,
      id: 0,
      ppm: 0,
      publish: false,
      tds: 0,
      tipo_cliente: '',
      updated_at: '',
      visitas: 0

    };

    this.service.fichaTecnicaItems = [];
  }

  private accionAntesDeCerrar(): void {

  }
}
