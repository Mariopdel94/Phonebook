import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModalBase } from '../../_components/modal/modal-base';
import { Contact, ContactService } from '../../_model';
import { ToastFactoryComponent } from '../../_components/toast/toast-factory/toast-factory.component';

@Component({
  selector: 'app-delete-contact-modal',
  templateUrl: './delete-contact-modal.component.html',
  styleUrls: ['./delete-contact-modal.component.scss']
})
export class DeleteContactModalComponent extends ModalBase implements OnInit, OnDestroy {
  @Input() public contact: Contact;
  @Output() public recordDeleted = new EventEmitter<boolean>();
  public isBusy = false;

  constructor(
    private contactService: ContactService,
  ) {
    super();
  }

  public submit() {
    this.isBusy = true;
    this.contactService.deleteContact(this.contact.id)
    .takeUntil(this.destroyed$)
    .subscribe((response: any) => {
      this.isBusy = false;
      if (response) {
        this.close();
        this.recordDeleted.emit(true);
        ToastFactoryComponent.showMessage('Contacto eliminado exitosamente.');
      }
    }, (error) => {
      this.isBusy = false;
      console.error(error);
    });
  }

}
