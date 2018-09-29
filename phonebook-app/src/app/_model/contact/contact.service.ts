import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { apiUrl } from './../../globals';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact';

@Injectable()
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllContacts(userId: number): Observable<{ records: Contact[] }> {
    const params = [
      `user_id=${ userId }`,
    ].join('&');
    return this.http.get(apiUrl + 'contacts/all/' + params)
    .map((data: any) => {
      if (data.contacts) {
        return { records: data.contacts.map(contact => Contact.parse(contact)) };
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  public getSingleContact(contactId: number): Observable<{ record: Contact }> {
    return this.http.get(apiUrl + 'contact/' + contactId)
    .map((data: any) => {
      if (data.contact) {
        return { record: Contact.parse(data.contact) };
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  public saveContact(contact: Contact): Observable<{ record: Contact }> {
    const params = {
      first_name: String(contact.firstName || ''),
      last_name: String(contact.lastName || ''),
      nick_name: String(contact.nickName || ''),
      company: String(contact.company || ''),
      title: String(contact.title || ''),
      website: String(contact.website || ''),
      address: String(contact.address || ''),
      comments: String(contact.comments || ''),
      birthday: moment(contact.birthday).format('YYYY-MM-DD'),
      phone_numbers: (contact.phoneNumbers || []).map(phoneNumber => {
        return {
          id: Number(phoneNumber.id || 0),
          type: String(phoneNumber.type || ''),
          number: String(phoneNumber.number || ''),
        };
      })
    };
    return this.http.post(`${ apiUrl }contact/${ contact.id }`, params)
    .map((data: any) => {
      let savedRecord = new Contact();
      if (data.contact) {
        savedRecord = Contact.parse(data.contact);
      }
      return { record: savedRecord };
    }, error => {
      console.log('Error: ', error);
    });
  }

  public deleteContact(contactId: number): Observable<boolean> {
    return this.http.delete(apiUrl + 'contact/' + contactId)
    .map((data: any) => {
      return data.status === 'success' ? true : false;
    }, error => {
      console.log('Error: ', error);
      return false;
    });
  }
}
