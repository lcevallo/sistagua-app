import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAccesorios } from '@data/interfaces/i-accesorios';
import { AccesoriosService } from '@data/services/api/accesorios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-accesorio',
  templateUrl: './accesorio.component.html',
  styleUrls: ['./accesorio.component.scss']
})
export class AccesorioComponent implements OnInit {

  accesorioFormGroup!: FormGroup;
  accesorio: IAccesorios;
  id: number = 0;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private accesorioService: AccesoriosService) {
              this.id = this.route.snapshot.params.id;
              this.accesorio = { nombre: '',  descripcion: ''};
              console.log(this.accesorio)

  }

  ngOnInit(): void {
    if(this.id > 0) {
      this.accesorioService.getById(this.id)
        .subscribe(data => {
          console.log(data.data)
          this.accesorio = {
            id: data.data.id,
            nombre: data.data.nombre,
            descripcion: data.data.descripcion
          };
          console.log(this.accesorio)
        });
    }
    this.accesorioFormGroup = this.formBuilder.group({
      nombre: [this.accesorio.nombre, Validators.required],
      descripcion: [this.accesorio.descripcion]
    });

  }

  onSubmit(): void {
    /*if (!this.accesorioFormGroup.valid) {
      return;
    }*/
    this.accesorio = {
      nombre: this.accesorioFormGroup.get('nombre')?.value,
      descripcion: this.accesorioFormGroup.get('descripcion')?.value,
    };
    this.accesorioService.guardar(this.accesorio)
      .subscribe(data => {
        console.log(data.data.id);

        if (data.data.id > 0) {
          swal.fire({
            icon: 'success',
            title: 'El registro se guardó con éxito',
            confirmButtonText: 'Ok',
          })
        } else {
          swal.fire({
            icon: 'error',
            title: 'Intente nuevamente!',
            confirmButtonText: 'Cerrar',
          })
        }
      });
  }

}
