import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import * as fromComponents from './components';
import { RouterModule } from '@angular/router';
import {MaterialModule} from "@material/material.module";

@NgModule({

  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [...fromComponents.components],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    ...fromComponents.components
  ]
})
export class SharedModule { }
