import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { UserQuery } from '../../utilities/queries/user.query';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private title = {'bold': "Show", "normal": "Sourcing - Test Case"};

  constructor(private apollo: Apollo) { }

  ngOnInit() {

  }

}
