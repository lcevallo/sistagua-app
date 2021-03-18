import {Component, OnInit, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent implements OnInit {

  @Output() respuesta:EventEmitter<boolean>= new EventEmitter<boolean>()

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void { }

  onNoClick(): void {
    this.respuesta.emit(false);
    this.dialogRef.close();
  }


  okFunction() {
    this.respuesta.emit(true);
  }
}
