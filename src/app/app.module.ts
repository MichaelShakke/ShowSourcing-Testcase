import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AppApolloModule } from '../providers/apollo.module';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppApolloModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
