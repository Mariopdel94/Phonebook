import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Contact, ContactService } from '../../_model/contact';

@Component({
  selector: 'app-create-phone',
  templateUrl: './create-phone.component.html',
  styleUrls: ['./create-phone.component.scss']
})
export class CreatePhoneComponent implements OnInit, OnDestroy {
  @Input() public selectedRecord$: Subject<Contact>;
  @Output() isEditing: EventEmitter<boolean> = new EventEmitter();
  @Output() contactSaved: EventEmitter<boolean> = new EventEmitter();
  // @ViewChild('saveForm') public recordForm: any;
  public contact = new Contact();
  public destroyed$ = new Subject();

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit() {
    this.contactSelectionListener();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private contactSelectionListener() {
    this.selectedRecord$
    .takeUntil(this.destroyed$)
    .subscribe(contact => {
      if (contact.id && contact.id > 0) {
        this.retrieveContact(contact.id);
      } else {
        this.contact = new Contact();
        // this.recordForm.reset();
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  private retrieveContact(id: number) {
    // this.contactService.getContact(id)
    // .takeUntil(this.destroyed$)
    // .subscribe(response => {
    //   this.contact = response.contact;
    // }, error => {
    //   console.log('Error: ', error);
    // });
  }

}
