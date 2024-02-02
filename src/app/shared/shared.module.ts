import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from './ui-kits/material-ui/material-ui.module';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule
  ]
})
export class SharedModule { }
