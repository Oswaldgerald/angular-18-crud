export class EmployeeModel{
    empid: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    mobileNo: string;
    address: string;
    pincode: string;

    constructor(){
        this.empid = 1;
        this.name = '';
        this.city = '';
        this.state = '';
        this.emailId = '';
        this.mobileNo = '';
        this.address = '';
        this.pincode = '';
    }
}
