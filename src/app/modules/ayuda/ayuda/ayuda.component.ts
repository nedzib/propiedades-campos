import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.sass']
})
export class AyudaComponent implements OnInit{

  text_encrypted:string | undefined;

  ngOnInit(): void {
    this.text_encrypted = this.hashString('cosa')
  }

  hashString(str: string): string {
    const sha256 = require('crypto-js/sha256');
    return sha256(str).toString();
  }

}
