import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { StorageService } from 'src/app/authentication/storage.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  name = "";

  showLargeMenu = true;
  @ViewChild('hideMenu') hideMenu: ElementRef<HTMLElement>;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private responsive: BreakpointObserver
  ) { }

  hideMenuAction() {
    if (this.hideMenu) {
      let hideMenuElement: HTMLElement = this.hideMenu.nativeElement;
      hideMenuElement.click();
    }
  }

  ngOnInit() {
    this.responsive.observe(Breakpoints.XSmall)
      .subscribe(result => {
        if (result.matches) {
          this.showLargeMenu = false;
        } else {
          this.showLargeMenu = true;
          this.hideMenuAction();
        }
      });
  }

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
    this.hideMenuAction();
    this.router.navigateByUrl('services');
  }
}
