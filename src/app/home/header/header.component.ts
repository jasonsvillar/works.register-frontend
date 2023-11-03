import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/authentication/storage.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  
  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  check(): boolean {
    this.isLoggedIn = this.storageService.isLoggedIn();
    return this.isLoggedIn;
  }

  logout(): void {
    this.authenticationService.logout().subscribe({
      next: data => {
        this.storageService.clean();
        this.isLoggedIn = false;
        this.router.navigateByUrl('user/login');
      }
    });
  }
}
