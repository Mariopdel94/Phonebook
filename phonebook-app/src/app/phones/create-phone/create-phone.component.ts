import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Contact, ContactService } from '../../_model/contact';
import { ContactNumber } from '../../_model/contact/contact-number';

@Component({
  selector: 'app-create-phone',
  templateUrl: './create-phone.component.html',
  styleUrls: ['./create-phone.component.scss']
})
export class CreatePhoneComponent implements OnInit, OnDestroy {
  @Input() public selectedRecord$: Subject<Contact>;
  @Output() isEditing: EventEmitter<boolean> = new EventEmitter();
  @Output() contactSaved: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('saveForm') public recordForm: any;
  public isBusy = false;
  public contact = new Contact();
  public destroyed$ = new Subject();
  public temporalPhone = ContactNumber.parse({ type: 'Móvil', number: '' });
  public phoneNumberTypes = ['Móvil', 'Hogar', 'Trabajo'];

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit() {
    this.contactSelectorListener();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private contactSelectorListener() {
    this.selectedRecord$
    .takeUntil(this.destroyed$)
    .subscribe(contact => {
      if (contact.id && contact.id > 0) {
        this.retrieveContact(contact.id);
      } else {
        this.contact = new Contact();
        this.recordForm.reset();
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  private retrieveContact(id: number) {
    this.isBusy = true;
    this.contactService.getSingleContact(id)
    .takeUntil(this.destroyed$)
    .subscribe(response => {
      this.isBusy = false;
      this.contact = response.record;
    }, error => {
      this.isBusy = false;
      console.log('Error: ', error);
    });
  }

  deleteNumber(phoneNumber) {
    const index = this.contact.phoneNumbers.findIndex((number) => phoneNumber.number === number.number);
    if (index !== -1) {
      this.contact.phoneNumbers.splice(index, 1);
    }
  }

  addNumber() {
    if (this.temporalPhone.type && this.temporalPhone.number && this.temporalPhone.number.length > 6) {
      this.contact.phoneNumbers.push(this.temporalPhone);
      this.temporalPhone = new ContactNumber();
      this.temporalPhone.type = 'Móvil';
    }
  }

}
