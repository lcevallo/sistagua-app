import { Component, OnInit } from '@angular/core';
import {FichaTecnicaService} from '@data/services/api/ficha-tecnica.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {

  isValid = true;

  constructor(
              public service: FichaTecnicaService) {
  }

  ngOnInit(): void {

    this.resetForm();

  }

  resetForm(form?: NgForm): void {

    if (form = null) {
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
}
