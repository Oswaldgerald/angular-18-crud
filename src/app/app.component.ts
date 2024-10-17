import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  reset(){
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }
  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empid),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      emailId: new FormControl(this.employeeObj.emailId),
      mobileNo: new FormControl(this.employeeObj.mobileNo,[Validators.required,Validators.maxLength(10)]),
      address: new FormControl(this.employeeObj.address),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      pinCode: new FormControl(this.employeeObj.pincode),
    });
  }

  onSave() {
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parsedData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parsedData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeForm.controls['empId'].setValue(1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.reset();
  }

  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate() {
    const record = this.employeeList.find(m => m.empid == this.employeeObj.empid);
    console.log(record)
    console.log(this.employeeObj)
    
    if (record) {
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.mobileNo = this.employeeForm.controls['mobileNo'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.pincode = this.employeeForm.controls['pincode'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.reset();
  }
  onDelete(id: number){
    const isDelete = confirm("Are you sure you want to deete this employee");
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empid==id)
      this.employeeList.splice(index,1)
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }
}
