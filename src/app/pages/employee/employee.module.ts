import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteComponent } from './delete/delete.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DeleteComponent,
    EmployeeComponent,
    ItemComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
  ]
})
export class EmployeeModule { }
