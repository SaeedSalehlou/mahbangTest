import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeModel } from '../../../domain/models/employee/employee.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeModel
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick() {
    this.dialogRef.close(true);
  }
}
