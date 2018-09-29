import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CreatePhoneComponent } from '../create-phone/create-phone.component';
import { PhoneCatalogComponent } from '../phone-catalog/phone-catalog.component';
import { Subject } from 'rxjs/Subject';
import { Contact } from '../../_model/contact/contact';

@Component({
  selector: 'app-phone-overview',
  templateUrl: './phone-overview.component.html',
  styleUrls: ['./phone-overview.component.scss']
})
export class PhoneOverviewComponent implements OnInit, OnDestroy {
  @ViewChild(CreatePhoneComponent) public createPhoneComponent: CreatePhoneComponent;
  @ViewChild(PhoneCatalogComponent) public phoneCatalogComponent: PhoneCatalogComponent;
  public destroyed$ = new Subject();
  public isEditing: boolean;
  public selectedRecord: Contact = null;
  public selectedRecord$: Subject<Contact> =  new Subject();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  closeEditing(): void {
    this.isEditing = false;
  }

  createHandler(): void {
    this.isEditing = true;
    this.selectedRecord = new Contact();
    this.selectedRecord$.next(this.selectedRecord);
  }

  editHandler(record: Contact): void {
    this.isEditing = true;
    this.selectedRecord = record.clone();
    this.selectedRecord$.next(this.selectedRecord);
  }

  onisEditing(isActive: boolean): void {
    this.isEditing = isActive;
  }

  onSave() {
    // this.phoneCatalogComponent.getContactList();
  }

}
