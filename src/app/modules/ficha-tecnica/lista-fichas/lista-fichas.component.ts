import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichaTecnicaService } from '@data/services/api/ficha-tecnica.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-fichas',
  templateUrl: './lista-fichas.component.html',
  styleUrls: ['./lista-fichas.component.scss']
})
export class ListaFichasComponent implements OnInit {


  fichadetalleList;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public service: FichaTecnicaService,
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.service.getFichaTecnicaList().then(res => this.fichadetalleList = res['orders_list']);
  }

}
