import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-catalog',
  templateUrl: './phone-catalog.component.html',
  styleUrls: ['./phone-catalog.component.scss']
})
export class PhoneCatalogComponent implements OnInit {
  public contacts = [1, 2, 3, 4];

  constructor() { }

  ngOnInit() {
  }

}
