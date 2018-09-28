import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports
import { ToastFactoryComponent } from '../_components/toast/toast-factory/toast-factory.component';

@Injectable()
export class HttpErrorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .catch((err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        switch (err.status) {
          case 400:
          if (Object.keys(err.error).length === 0 || !err.error) {
            ToastFactoryComponent.showErrorMessage('Error: ' + err.status + '. La API espera algo que no fue recibido o no estaba en el formato correcto por lo que no procesa la información.');
          }
          return Observable.throw(err);
          case 401:
          if (err.error.status && err.error.status === 'session') {
            ToastFactoryComponent.showErrorMessage('Error: ' + err.status + '. Estás intentando acceder a algún servicio que requiere autorización y las credenciales o token enviado es invalido.');
          }
          return Observable.throw(err);
          case 404:
          if (Object.keys(err.error).length === 0 || !err.error) {
            ToastFactoryComponent.showErrorMessage('Error: ' + err.status + '. No se encontró ruta para el servicio que se manda llamar.');
          }
          return Observable.throw(err);
          case 500:
          if (Object.keys(err.error).length === 0 || !err.error) {
            ToastFactoryComponent.showErrorMessage('Error: ' + err.status + '. Errores en el código del API.');
          }
          return Observable.throw(err);
          case 503:
          if (Object.keys(err.error).length === 0 || !err.error) {
            ToastFactoryComponent.showErrorMessage('Error: ' + err.status + '. El servidor se encuentra en mantenimiento.');
          }
          return Observable.throw(err);
          default:
          if (Object.keys(err.error).length === 0 || !err.error) {
            ToastFactoryComponent.showErrorMessage('Error: ' + err.status);
          }
          return Observable.throw(err);
        }
      }
    });
  }
}
