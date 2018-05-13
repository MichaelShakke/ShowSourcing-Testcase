import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    //Default translation if it isn't found in the current language
    translate.setDefaultLang('en');

    //Language to use, if it isn't available, it will use the current loader to get it
    translate.use('en');
  }
}
