import * as moment from 'moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import 'moment/locale/es';

import { NgSelectModule } from '@ng-select/ng-select';
import { LaddaModule } from 'angular2-ladda';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material';

import { RouterComponent } from './_components/router/router.component';
import { SearchBoxComponent } from './_components/search-box/search-box.component';
import { ToastComponent } from './_components/toast/toast/toast.component';
import { SpinnerComponent } from './_components/spinner/spinner/spinner.component';
import { ToastFactoryComponent } from './_components/toast/toast-factory/toast-factory.component';
import { CheckboxComponent } from './_components/checkbox/checkbox.component';
import { ModalComponent } from './_components/modal/modal';
import { NgxMaskModule } from 'ngx-mask';

/** Services */
import { HttpErrorService } from './_services/http-error.service';
import { HttpInterceptorService } from './_services/http-interceptor.service';
import { SessionService } from './_services/session.service';
import { UserService } from './_model/user/user.service';
import { ContactService } from './_model/contact/contact.service';

/** Components */
import { LoginComponent } from './login/login.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { PhoneOverviewComponent } from './phones/phone-overview/phone-overview.component';
import { PhoneCatalogComponent } from './phones/phone-catalog/phone-catalog.component';
import { CreatePhoneComponent } from './phones/create-phone/create-phone.component';
import { DeleteContactModalComponent } from './modals/delete-contact-modal/delete-contact-modal.component';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'index', component: WrapperComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
      { path: 'inicio', component: PhoneOverviewComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

const MY_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

@Injectable()
export class MyDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return moment(new Date(year, month, day)).format('LL');
    } else {
      return date.toDateString();
    }
  }
  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

@NgModule({
  declarations: [
    LoginComponent,
    RouterComponent,
    WrapperComponent,
    PhoneOverviewComponent,
    PhoneCatalogComponent,
    CreatePhoneComponent,
    SpinnerComponent,
    ToastFactoryComponent,
    CheckboxComponent,
    ModalComponent,
    ToastComponent,
    SearchBoxComponent,
    DeleteContactModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerColor: '#71c9f4'
    }),
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  entryComponents: [
    ToastComponent
  ],
  providers: [
    SessionService,
    UserService,
    ContactService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorService, multi: true },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [ RouterComponent ]
})
export class AppModule { }
