import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule) },

  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: '**', redirectTo: 'employee', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
