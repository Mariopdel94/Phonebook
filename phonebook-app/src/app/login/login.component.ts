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
    .subscribe((response) => {
      console.log(response);
      this.submitButtonBusy = false;
      if (response.user.id === 0) {
        ToastFactoryComponent.showErrorMessage('Credenciales inválidas');
      } else {
        this.router.navigate(['index']);
      }
    }, error => {
      this.submitButtonBusy = false;
      console.log(error);
      ToastFactoryComponent.showErrorMessage('Hubo un error al querer iniciar sesión, por favor intenta más tarde.');
    });
  }
}
