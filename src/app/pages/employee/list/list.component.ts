import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../../../domain/models/employee/employee.model';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { BaseResponseModel } from '../../../domain/models/base/base-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponseService } from '../../../shared/services/message-response.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  currentRow = 0;
  displayedColumns: string[] = ['id', 'name', 'salary', 'age', 'image'];
  orgData: EmployeeModel[] = [];
  dataSource = new MatTableDataSource();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private MatDialog: MatDialog,
    private messageResponseService: MessageResponseService
  ) { }
  ngOnInit(): void { this.loadData(); }

  loadData() {
    this.employeeService.get()
      .subscribe(
        (res: BaseResponseModel<EmployeeModel[]>) => {
          if (res.status === 'success') {
            this.orgData = res.data;
            this.dataSource.data = this.orgData;
          }
          this.messageResponseService.showMessage(res.message, 1000);
        }
      )
  }

  search(searchTerm: string) {
    let filterData = this.orgData.filter(
      (current) => {
        return current.employee_name?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          current.employee_age?.toString().includes(searchTerm) ||
          current.employee_salary?.toString().includes(searchTerm)
      }
    )
    this.dataSource.data = filterData;
  }
  //#region Crud
  getById(id: number) {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  }

  add() {
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute,
    });
  }
  delete(model: EmployeeModel) {
    const dialogRef =
      this.MatDialog.open(
        DeleteComponent, {
        data: model,
      });

    dialogRef.afterClosed().
      subscribe(
        (res) => {
          if (res) {
            this.employeeService.delete(model.id)
              .subscribe(
                (res: BaseResponseModel<null>) => {
                  if (res.status === 'success') {
                    this.messageResponseService.showBaseResponse(res);
                    this.loadData();
                  }
                  else {
                    this.messageResponseService.showBaseResponse(res);
                  }
                });
          }
        }
      );
  }
  //#endregion Crud
}
