import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {

  public isToogle = false;

  constructor() { }

  ngOnInit(): void {
  }


  changeToogle(){
    this.isToogle=!this.isToogle;

  }

}
