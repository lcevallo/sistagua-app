import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IFichaTecnica } from '@data/interfaces/i-ficha-tecnica';
import { IclienteNatural } from '@data/interfaces/icliente-natural';
import { ClienteNaturalService } from '@data/services/api/cliente-natural.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {

  }

}
