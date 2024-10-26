import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskManger';
  constructor() {
    setTheme('bs5'); // or 'bs4'
  }
  
currentTab : any;
previousTab! : HTMLAnchorElement;

 setBg(event : any){
  // if(this.previousTab){
  //   console.log(this.previousTab);
  //   this.previousTab.style.background = ""
  // }
  // this.currentTab = event.target;
  // this.currentTab.style.background="red";
  // console.log(this.currentTab)
  // this.currentTab = this.previousTab;
  // console.log(this.previousTab);
 }

  
}
