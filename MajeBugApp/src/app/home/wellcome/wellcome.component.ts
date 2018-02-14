import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {

  model:any={ name:'name', lastName:'lastName', gender:true, photo:'https://angular.io/generated/images/marketing/home/code-icon.svg' };
  items:string[] = ["item 1","item 2","item 3","item 4"];

  myName:string = "my name";
  imgSize:number = 200;

  clicked() {
    this.model.lastName = this.model.lastName + 'A';
    console.log('hola ' + this.model.name);
    this.imgSize += 10;
  }

  addItem() {
    this.items.push("5");
  }
  removeItem() {
    this.items.pop();
  }

  selectedItem(item) {
    console.log(item);
  }

  constructor() { }

  ngOnInit() {
  }

}
