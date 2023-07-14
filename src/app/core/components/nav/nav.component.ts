import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  hideDropdown = true;

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onClick(action: string): void {
    if (action == 'participante'){
      this.router.navigate(['/participante']);
    }
    if (action == 'distribuidor'){
      this.router.navigate(['/distribuidor']);
    }
  }

  toggle(){
    this.hideDropdown = !this.hideDropdown
  }

  close(){
    this.hideDropdown = true
  }

}
