import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  employeeForm!: FormGroup;

  employeeObj: EmployeeModel = new EmployeeModel();

  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    // debugger;
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      emailId: new FormControl(this.employeeObj.emailId, [
        Validators.required,
        Validators.email,
      ]),
      contactNumber: new FormControl(this.employeeObj.contactNumber),
      address: new FormControl(this.employeeObj.address),
      pinCode: new FormControl(this.employeeObj.pinCode, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onReset() {
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  onSave() {
    // debugger;
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.onReset();
  }

  onUpdate() {
    const record = this.employeeList.find(
      (m) => m.empId == this.employeeForm.controls['empId'].value
    );
    if (record != undefined) {
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.contactNumber = this.employeeForm.controls['contactNumber'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.onReset();
  }

  onEdit(item: EmployeeModel) {
    // console.log(
    //   `Edit button was clicked and this is the object we are about to edit:`
    // );
    // console.log((this.employeeObj = item));
    this.employeeObj = item;
    this.createForm();
  }

  onDelete(id: number) {
    // console.log('Delete button was clicked.');
    const isDelete = confirm('Are you sure you want to delete?');

    if (isDelete) {
      const index = this.employeeList.findIndex((m) => m.empId == id);
      this.employeeList.splice(index, 1);
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
  }
}
