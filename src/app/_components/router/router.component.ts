import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { SessionService } from '../../_services/session.service';

@Component({
  selector: 'app-router',
  template: '<router-outlet></router-outlet>',
})
export class RouterComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private session: SessionService,
  ) {
    this.router.events.subscribe(event => this.handleRoute(event));
  }

  private handleRoute(event: any): void {
    if (event instanceof NavigationStart) {
      const isUserLogged = this.session.isLogged();
      if (isUserLogged) {
        // If user is logged in, and he enters to the login page,
        // he is redirected to the main page.
        if (event.url.indexOf('login') > -1) {
          this.router.navigateByUrl('/index');
        }

        if (event.url.indexOf('index') > -1) {
          this.validateRoutePrivilege(event.url.replace('/index/', ''));
        }

      } else {
        if (event.url.indexOf('login') === -1) {
          this.router.navigateByUrl('/login');
        }
      }
    }
  }

  /** Checks if the user in session has the privilege to visit the given route. */
  private validateRoutePrivilege(route: string): void {

  }
}
