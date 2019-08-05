import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { apiUrl, development } from 'src/app/apiUrl';
import { of } from 'rxjs';

@Injectable()
export class ContactService {
  private _dummyContacts = [
    {
      id: 1,
      phoneNumbers: [
        {
          id: 1,
          type: 'Móvil',
          number: '6561619831'
        }
      ],
      firstName: 'Mario',
      lastName: 'Pineda',
      nickName: 'MP',
      company: 'Freelancer',
      website: 'mariopineda.com.mx',
      address: 'Calle del domicilio',
      comments: 'Frontend developer',
      email: 'mariopdel94@gmail.com',
      birthday: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      phoneNumbers: [
        {
          id: 2,
          type: 'Móvil',
          number: '6561619831'
        }
      ],
      firstName: 'Jane',
      lastName: 'Doe',
      nickName: 'JD',
      company: 'Unknown',
      website: 'janedoe.com',
      address: '',
      comments: 'Not recognized',
      email: 'janedoe@unknown.com',
      birthday: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      phoneNumbers: [
        {
          id: 3,
          type: 'Móvil',
          number: '6561619831'
        }
      ],
      firstName: 'John',
      lastName: 'Doe',
      nickName: 'JD',
      company: 'Unknown',
      website: 'johndoe.com',
      address: '',
      comments: 'Not recognized',
      email: 'johndoe@unknown.com',
      birthday: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ].map(contact => Contact.parse(contact));

  constructor(
    private http: HttpClient
  ) { }

  public getAllContacts({currentPage, itemsPerPage, searchString}): Observable<{ records: Contact[], totalItems: number }> {
    if (development) {
      let records = this._dummyContacts;
      if (searchString) {
        records = this._dummyContacts.filter(contact =>
          contact.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchString.toLowerCase())
        );
      }
      return of({ records, totalItems: this._dummyContacts.length });
    } else {
      const params = [
        `page=${ Number(currentPage) }`,
        `per_page=${ Number(itemsPerPage) }`,
        `search=${ String(searchString || '') }`
      ].join('&');
      return this.http.get(apiUrl + 'phonebook/contact/all?' + params)
      .map((data: any) => {
        if (data.contacts && data.contacts.data) {
          return { records: (data.contacts.data || []).map(contact => Contact.parse(contact)), totalItems: data.contacts.total || 0 };
        }
      }, error => {
        console.log('Error: ', error);
      });
    }
  }

  public getSingleContact(contactId: number): Observable<{ record: Contact }> {
    if (development) {
      const record = this._dummyContacts.find(contact => contact.id === contactId) || new Contact();
      return of({ record });
    } else {
      return this.http.get(apiUrl + 'phonebook/contact/single?id=' + contactId)
      .map((data: any) => {
        if (data.contact) {
          return { record: Contact.parse(data.contact) };
        }
      }, error => {
        console.log('Error: ', error);
      });
    }
  }

  public saveContact(contact: Contact): Observable<{ record: Contact }> {
    if (development) {
      if (!contact.id) {
        contact.id = this._dummyContacts[this._dummyContacts.length - 1].id + 1;
      }
      let phoneNumbersLength = contact.phoneNumbers.length;
      contact.phoneNumbers.forEach(phoneNumber => {
        if (!phoneNumber.id) {
          phoneNumber.id = phoneNumbersLength + 1;
          phoneNumbersLength++;
        }
      });
      if (!contact.id) {
        this._dummyContacts.unshift(contact);
      }
      const record = contact;
      return of({ record });
    } else {
      const params = {
        id: Number(contact.id || 0),
        first_name: String(contact.firstName || ''),
        last_name: String(contact.lastName || ''),
        nick_name: String(contact.nickName || ''),
        company: String(contact.company || ''),
        website: String(contact.website || ''),
        email: String(contact.email || ''),
        address: String(contact.address || ''),
        comments: String(contact.comments || ''),
        birthday: contact.birthday ? moment(contact.birthday).format('YYYY-MM-DD') : '',
        phone_numbers: (contact.phoneNumbers || []).map(phoneNumber => {
          return {
            id: Number(phoneNumber.id || 0),
            type: String(phoneNumber.type || ''),
            number: String(phoneNumber.number || ''),
          };
        })
      };
      return this.http.post(`${ apiUrl }phonebook/contact/save`, params)
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
  }

  public deleteContact(contactId: number): Observable<boolean> {
    if (development) {
      const index = this._dummyContacts.findIndex(contact => contact.id === contactId);
      this._dummyContacts.splice(index, 1);
    } else {
      return this.http.delete(apiUrl + 'phonebook/contact/delete/' + contactId)
      .map((data: any) => {
        return data.status === 'success' ? true : false;
      }, error => {
        console.log('Error: ', error);
        return false;
      });
    }
  }
}
