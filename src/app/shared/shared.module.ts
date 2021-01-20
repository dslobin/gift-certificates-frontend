import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopButtonComponent} from './components/top-button/top-button.component';
import {TagNamePipe} from './pipes/tag-name.pipe';
import {ItemCostPipe} from './pipes/item-cost.pipe';

@NgModule({
  declarations: [
    TopButtonComponent,
    TagNamePipe,
    ItemCostPipe,
  ],
  exports: [
    TopButtonComponent,
    TagNamePipe,
    ItemCostPipe,
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
}
