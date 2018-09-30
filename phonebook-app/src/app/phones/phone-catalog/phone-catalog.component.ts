import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Contact, ContactService } from '../../_model';
import { Subject } from 'rxjs/Subject';
import { ToastFactoryComponent } from '../../_components/toast/toast-factory/toast-factory.component';

@Component({
  selector: 'app-phone-catalog',
  templateUrl: './phone-catalog.component.html',
  styleUrls: ['./phone-catalog.component.scss']
})
export class PhoneCatalogComponent implements OnInit, OnDestroy {
  @Output() onCreate = new EventEmitter<boolean>();
  @Output() onEdit = new EventEmitter<Contact>();
  public contacts: Contact[] = [];
  public searchString = '';
  public destroyed$ = new Subject();
  public itemsPerPage = 10;
  public currentPage = 1;
  public totalItems = 0;
  public isBusy = false;

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getContactsList();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public getContactsList(): void {
    this.isBusy = true;
    this.contactService.getAllContacts({ currentPage: this.currentPage, itemsPerPage: this.itemsPerPage, searchString: this.searchString })
    .takeUntil(this.destroyed$)
    .subscribe((response) => {
      this.isBusy = false;
      this.contacts = response.records;
      this.totalItems = response.totalItems;
    }, (error) => {
      this.isBusy = false;
      console.log(error);
      ToastFactoryComponent.showErrorMessage('No se pudo obtener el listado de contactos, por favor intenta de nuevo más tarde.');
    });
  }

  public triggerSearch(value: string): void {
    this.searchString = value;
    this.getContactsList();
  }

  public triggerCreation(): void {
    this.onCreate.emit(true);
  }

  public triggerEdition(contact: Contact): void {
    this.onEdit.emit(contact);
  }

  getContactInitials(contact: Contact): string {
    return (contact.firstName[0] || '') + (contact.lastName[0] || '');
  }

  displayPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length === 10) {
      return '(' + phoneNumber.slice(0, 3) + ')-' + phoneNumber.slice(3, 7) + '-' + phoneNumber.slice(7);
    } else if (phoneNumber.length === 7) {
      return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3);
    } else {
      return phoneNumber;
    }
  }

}
