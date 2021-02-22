import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccesorios } from '@data/interfaces/i-accesorios';
import { AccesoriosService } from '@data/services/api/accesorios.service';

@Component({
  selector: 'app-accesorio',
  templateUrl: './accesorio.component.html',
  styleUrls: ['./accesorio.component.scss']
})
export class AccesorioComponent implements OnInit {

  accesorioFormGroup!: FormGroup;
  accesorio!: IAccesorios;

  constructor(private formBuilder: FormBuilder,
              private accesorioService: AccesoriosService) {
  }

  ngOnInit(): void {
    this.accesorioFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  onSubmit(): void {
    if (!this.accesorioFormGroup.valid) {
      return;
    }
    this.accesorio = {
      nombre: this.accesorioFormGroup.get('nombre')?.value,
      descripcion: this.accesorioFormGroup.get('descripcion')?.value,
    };
    this.accesorioService.guardar(this.accesorio)
      .subscribe(data => console.log(data));
  }

}
