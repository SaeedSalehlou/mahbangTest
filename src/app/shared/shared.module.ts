import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from './ui-kits/material-ui/material-ui.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialUiModule
  ],
  exports: [
    MaterialUiModule
  ]
})
export class SharedModule { }
