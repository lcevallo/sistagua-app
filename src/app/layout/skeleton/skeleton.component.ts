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
    const bodyElement = document.body
    this.isToogle=!this.isToogle;

    if(this.isToogle){
      bodyElement.classList.add('sidebar-toggled');
    }
    else{
      bodyElement.classList.remove('sidebar-toggled');
    }

  }

}
