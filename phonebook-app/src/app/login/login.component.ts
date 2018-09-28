import { Component, OnInit } from '@angular/core';
import { UserService } from '../_model/user/user.service';
import { ToastFactoryComponent } from '../_components/toast/toast-factory/toast-factory.component';
import 'rxjs/add/operator/takeWhile';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitButtonBusy = false;
  public errorMessage: string;
  public user: any;
  public password: any;
  private alive = true;

  constructor(
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  trim(event) {
    if (event.code === 'Space') {
      return false;
    }
  }

  submit() {
    this.submitButtonBusy = true;
    this.user.trim();
    this.userService.login(this.user, this.password)
    .takeWhile(() => this.alive)
    .subscribe((data) => {
      this.submitButtonBusy = false;
      this.router.navigate(['index']);
    }, error => {
      this.submitButtonBusy = false;
      if ( error.error.type === 'account_not_found' || error.error.type === 'password_not_found' ) {
        this.errorMessage = 'La cuenta ingresada no existe.';
        ToastFactoryComponent.showErrorMessage(this.errorMessage);
      } else if ( error.error.type === 'password' ) {
        this.errorMessage = 'La contraseña ingresada es incorrecta.';
        ToastFactoryComponent.showErrorMessage(this.errorMessage);
      } {
        ToastFactoryComponent.showErrorMessage('Hubo un error al querer iniciar sesión, por favor intenta más tarde.');
      }
    });
  }
}
