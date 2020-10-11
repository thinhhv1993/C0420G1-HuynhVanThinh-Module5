import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomerService} from './customer.service';
import {Customer} from '../model/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  birth = '^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$';
  customer: Customer;
  listCustomer: Customer[] = [];
  customerForm: FormGroup;
  customerName: string;
  checkForm = false;
  i: number;
  q: number;

  constructor(private CustomerService1: CustomerService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.pattern('^(KH)[\\d]{4}$')]],
      customerName: ['', Validators.required],
      customerBirthday: ['', [Validators.required, dateValidator]],
      customerCard: ['', [Validators.required, Validators.pattern('^[\\d]{9}$')]],
      customerPhone: ['', [Validators.required, Validators.pattern('^[\\d]{9}$')]],
      customerEmail: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      customerAddress: ['', Validators.required],
      customerType: ['', [Validators.required]]
    });
    this.CustomerService1
      .getCustomer()
      .subscribe(next => (this.listCustomer = next), error => (this.listCustomer = []));
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const {value} = this.customerForm;
      this.CustomerService1.createCustomer(value)
        .subscribe(next => {
          this.listCustomer.unshift(next);
          this.customerForm.reset({
            customerId: '',
            customerName: '',
            customerBirthday: '',
            customerCard: '',
            customerPhone: '',
            customerEmail: '',
            customerAddress: '',
            customerType: '',
          });
        }, error => console.log(error));
    }
  }

  deleteCustomer() {
    const customer = this.listCustomer[this.i];
    this.CustomerService1.deleteCustomer(this.i).subscribe(() => {
      this.listCustomer = this.listCustomer.filter(t => t.id !== customer.id);
    });
    this.ngOnInit();
    this.customerName = '';
    this.i = null;
  }

  checkDelete(i: number,cid: string) {
    this.i = i;
    this.customerName = cid;
  }

  changCustomer(customer: Customer, i: number) {
    this.customerForm.patchValue(customer);
    this.i = i;
    this.checkForm = true;
  }

  editCustomer(){
    if (this.customerForm.valid) {
      const { value } = this.customerForm;
      const data = {
        ...this.customer,
        ...value
      };
      this.CustomerService1.updateCustomer(data,this.i).subscribe(
        next => {
          this.customerForm.reset({
            customerId: '',
            customerName: '',
            customerBirthday: '',
            customerCard: '',
            customerPhone: '',
            customerEmail: '',
            customerAddress: '',
            customerType: '',
          });
          this.ngOnInit();
          this.checkForm = false;
        },
        error => console.log(error)
      );
    }
  }

  resetForm() {
    this.checkForm = false;
    this.customerForm.reset({
      customerId: '',
      customerName: '',
      customerBirthday: '',
      customerCard: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
      customerType: '',
    });
  }
}
function dateValidator(formControl: FormControl) {
  let date1: string[];
  date1 = formControl.value.split('-');
  console.log(date1);
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
  const m_date = o_date.formatToParts().reduce(f_date, {});
  let dateNumber = ((parseInt(date1[0])) * 365) + ((parseInt(date1[1])) * 30) + (parseInt(date1[2])) ;
  let dateNumberNow = ((parseInt(m_date.year)) * 365) + ((parseInt(m_date.month)) * 30) + (parseInt(m_date.day)) ;
  console.log(dateNumberNow);
  console.log(dateNumber);
  if ( (dateNumber < (dateNumberNow - 36000))) {
    return {checkDate: true};
  }if( (dateNumber > dateNumberNow)){
    return {checkDate: true}
  }
  return null;
}
