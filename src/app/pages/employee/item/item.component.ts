import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { MessageResponseService } from '../../../shared/services/message-response.service';
import { BaseResponseModel } from '../../../domain/models/base/base-response.model';
import { EmployeeModel } from '../../../domain/models/employee/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  id: number | undefined;
  employeeFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageResponseService: MessageResponseService,
    private employeeService: EmployeeService,
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this._initFormElement();
  }
  ngOnInit(): void {
    if (this.id) this.loadData(this.id)
  }
  //#region InitForm
  private _initFormElement() {
    this.employeeFormGroup = this.formBuilder.group({
      id: ['', null],
      employee_name: ['', Validators.required],
      employee_salary: ['', Validators.required],
      employee_age: ['', Validators.required],
      profile_image: [''],
    });
  }
  loadData(id: number) {
    this.employeeService.getItemById(id)
      .subscribe(
        (res: BaseResponseModel<EmployeeModel>) => {
          this.employeeFormGroup.patchValue(res.data);
          this.messageResponseService.showBaseResponse(res);
        }
      )
  }
  clearForm() { }
  //#endregion initForm
  //#region Actions
  onSaveClick() {
    let data = this.employeeFormGroup!.value as EmployeeModel;

    if (this.id)
      this.employeeService.update(this.id, data).subscribe(
        (res) => {
          this.messageResponseService.showBaseResponse(res);
        })
    else
      this.employeeService.create(data)
        .subscribe(
          (res) => {
            if (res.status === "success") this.clearForm();
            this.messageResponseService.showBaseResponse(res);
          })
  }
  onCancelick() {
    this.router.navigate([''], {
      relativeTo: this.activatedRoute,
    });
  }

  //#endregion Actions
  //#region Validation 
  getNameErrorMessage() {
    return this.employeeFormGroup!.get('employee_name')!.hasError('employee_name') ? 'Please Enter Employee Name' : '';
  }
  getSalaryErrorMessage() {
    return this.employeeFormGroup!.get('employee_salary')!.hasError('employee_salary') ? 'Please Enter Employee Salary' : '';
  }
  getAgeErrorMessage() {
    return this.employeeFormGroup!.get('employee_age')!.hasError('employee_age') ? 'Please Enter Employee Age' : '';
  }
  //#endregion Validation

}
