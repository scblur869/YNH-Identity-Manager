import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public currentDate = new Date();
  public email!: string | null;
  public role!: string | null;
  public dn!: string | null;

  constructor(private authSvc: AuthService) { }

  lou(): void {
    this.authSvc._logout().subscribe(
      res => this.authSvc._uiLogout(),
      err => console.log(err));
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.dn = localStorage.getItem('dn');
    this.role = localStorage.getItem('role');
  }

}
