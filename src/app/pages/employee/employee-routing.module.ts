import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: '', component: EmployeeComponent, children: [
      { path: '', component: ListComponent },
      { path: ':id', component: ItemComponent, },
      { path: 'create', component: ItemComponent, },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
