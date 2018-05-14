import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Users } from '../../models/user.model';
import { UserQuery } from '../../utilities/queries/user.query';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css']
})
export class NavbarComponent implements OnInit {

  private users : User;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<Users>({
      query : UserQuery.query_getUserById
    }).valueChanges.subscribe(({data}) => {
      this.users = {
        'id' : data.users[0].id,
        'firstName' : data.users[0].firstName,
        'lastName' : data.users[0].lastName,
        'email' : data.users[0].email
      };
    });
  }

}
