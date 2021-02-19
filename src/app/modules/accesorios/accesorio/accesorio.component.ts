import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccesorios } from '@data/interfaces/i-accesorios';

@Component({
  selector: 'app-accesorio',
  templateUrl: './accesorio.component.html',
  styleUrls: ['./accesorio.component.scss']
})
export class AccesorioComponent implements OnInit {

  accesorioFormGroup: FormGroup;
  accesorio!: IAccesorios;
  constructor(private _formBuilder: FormBuilder) {
    this.accesorioFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accesorio = {
      nombre: this.accesorioFormGroup.get('nombre')?.value,
      descripcion: this.accesorioFormGroup.get('descripcion')?.value,
    };
    console.log(this.accesorio)
  }

}
