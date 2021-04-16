import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {HojaControlService} from '@data/services/api/hoja-control.service';
import {NgForm} from '@angular/forms';
import {DetalleComponent} from '@modules/hoja-control/lista-hojas/detalle/detalle.component';
import {AccesoriosComponent} from '@modules/hoja-control/lista-hojas/accesorios/accesorios.component';
import {FiltracionesComponent} from '@modules/hoja-control/lista-hojas/filtraciones/filtraciones.component';
import {HojaControl} from '@data/schema/hoja-control.model';

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
    private toaster: ToastrService,
    private router: Router,
    private  currentRoute: ActivatedRoute,
    public service: HojaControlService
  ) { }

  ngOnInit(): void {

    this.resetForm();

  }

  validateForm(): boolean {
    this.isValid = true;
    if (this.service.formData.codigo.length === 0)
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
      this.service.saveOrUpdateHojaControl().subscribe(res => {
          this.resetForm();
          this.toaster.success('Guardado exitoso!', 'Hoja de Control');
          this.router.navigate(['/hoja-de-control/hojas-control']);
        }
      );
    }
  }


  AddOrEditHojaControlDetalle(detalleItemIndex: number, hojaControlId: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    /**
     * Estos valores los pasare al componente Dialog: DetalleComponent
     */
    dialogConfig.data = {detalleItemIndex, hojaControlId};
    /**
     * Despues de cerrar el dialogo que servira para seleccionar el item de comida actualizare el Grand Total
     */
    this.dialog.open(DetalleComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.accionAntesDeCerrar();
      }
    );

  }

  AddOrEditAccesorios(detalleItemIndex: number, fichaTecnicaId: number): void {
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


  AddOrEditFiltraciones(detalleItemIndex: number, fichaTecnicaId: number): void {
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


  onDeleteHojaControlDetalle(IdFichaTecnicaDetalle: number, i: number): void {
    if (IdFichaTecnicaDetalle !== 0) {
      console.log(IdFichaTecnicaDetalle);
      // TODO: LLamar al servicio que debe de borrar solo el detalle Item de la ficha tecnica


    }

    this.service.hojaControlItems.splice(i, 1);
  }

  resetForm(form?: NgForm): void {

    if (form) {
      form.form.reset();
    }

    this.service.formData = new HojaControl();

    this.service.hojaControlItems = [];
  }

  private accionAntesDeCerrar(): void {

  }

}
