import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../_model';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  public user: User = this.sessionService.getUser();

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

  getContactInitials(): string {
    return (this.user.firstName[0] || '') + (this.user.lastName[0] || '');
  }

}
