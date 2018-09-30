import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private sessionService: SessionService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authorizedRequest = req.clone({
        setHeaders: {
          'user-id': this.sessionService.getUser() ? String(this.sessionService.getUser().id) : '',
        },
      });

      return next.handle(authorizedRequest);
    }

  }
