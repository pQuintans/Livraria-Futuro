import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../base.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  get user() {
    return this.baseService.user;
  }

  constructor(private baseService: BaseService, private router: Router) { }

  goToLanding() {
    this.router.navigateByUrl('/');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.router.navigateByUrl('/');
    this.baseService.clearUser();
  }
}
