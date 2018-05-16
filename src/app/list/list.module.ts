import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListService } from '../../providers/list.service';
import { ListComponent } from './list.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [ListComponent],
  exports: [ListComponent]

})

export class ListModule {
  //this way we make sure it is only instanciated once, Singleton
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ListModule,
      providers: [ListService]
    }
  }
}
