import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HojaControlService} from '@data/services/api/hoja-control.service';
import { IHojaControlTmp } from '@data/interfaces/i-hoja-control-tmp';
import swal from 'sweetalert2';


@Component({
  selector: 'app-lista-hojas',
  templateUrl: './lista-hojas.component.html',
  styleUrls: ['./lista-hojas.component.scss']
})
export class ListaHojasComponent implements OnInit {

  hojaDetalleList: IHojaControlTmp[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public service: HojaControlService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.service.getHojasControlList().subscribe( res => {

      this.hojaDetalleList = res.data as IHojaControlTmp[];
    });
  }

  openForEdit(hojaControlId: number): void {
    this.router.navigate(['/hoja-de-control/hoja-control/edit/' + hojaControlId]);
  }


  onHojaControlDelete(hojaControlId: number): void {
    swal.fire({
      title: 'Esta seguro?',
      text: 'No se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
    }).then( (result) => {
        if(result.isConfirmed) {
          this.service.deleteHojaControl(hojaControlId).subscribe(
            res => { if(res.data == ''){
                          swal.fire('Borrado','La hoja de control ha sido eliminada con exito!');
                          this.refreshList();
                        }
            }
          )
        }
      } );
  }// fin del metodo OnHojaControlDelete
}
