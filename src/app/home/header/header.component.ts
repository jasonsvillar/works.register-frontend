import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/authentication/storage.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent {
  isLoggedIn = false;
  name = "";

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  check(): boolean {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.name = this.storageService.getUser().name;
    } else {
      this.name = "";
    }
    return this.isLoggedIn;
  }

  logout(): void {
    this.authenticationService.logout().subscribe({
      next: data => {
        this.storageService.clean();
        this.isLoggedIn = false;
        this.name = "";
        this.router.navigateByUrl('user/login');
      }
    });
  }

  goToServices(): void {
    this.router.navigateByUrl('services');
  }
}
