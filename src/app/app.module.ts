import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AppApolloModule } from '../providers/apollo.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppApolloModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
