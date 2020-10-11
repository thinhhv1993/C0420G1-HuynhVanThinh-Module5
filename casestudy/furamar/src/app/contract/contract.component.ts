import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {ContractService} from './contract.service';
import {Contract} from '../model/contract';
import {Service} from '../model/service';
import {Customer} from '../model/customer';
import {ServiceService} from '../service/service.service';
import {CustomerService} from '../customer/customer.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  providers: [ContractService]
})
export class ContractComponent implements OnInit {

  contract: Contract;
  listContract: Contract[] = [];
  listService: Service[] = [];
  listCustomer: Customer[] = [];
  contractForm: FormGroup;
  contractId: string;
  checkForm = false;
  i: number;

  constructor(private contractService: ContractService,
              private fb: FormBuilder,
              private customerService: CustomerService,
              private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this.contractForm = this.fb.group({
      contractId: ['', Validators.required],
      customerId: ['', Validators.required],
      serviceId: ['', Validators.required],
      contractStarDate: ['', [Validators.required, dateValidator, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
      contractEndDate: ['', [Validators.required, dateValidator, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
      contractDeposits: ['', [Validators.required, numberValidator]],
      contractTotal: ['', [Validators.required, numberValidator]],
    });
    this.contractService
      .getContract()
      .subscribe(next => {
        this.listContract = next;
        for (let i = 0; i < this.listContract.length; i++) {
          this.customerService.getCustomerById(this.listContract[i].customerId).subscribe(data => {
            this.listContract[i].customer = data;
          });
          this.serviceService.getServiceById(this.listContract[i].serviceId).subscribe(data => {
            this.listContract[i].service = data;
          });
        }
      }, error => (this.listContract = []));

    this.customerService
      .getCustomer()
      .subscribe(next => (this.listCustomer = next), error => (this.listCustomer = []));

    this.serviceService
      .getService()
      .subscribe(next => (this.listService = next), error => (this.listService = []));
  };

  onSubmit() {
    if (this.contractForm.valid) {
      const {value} = this.contractForm;
      this.contractService.createContract(value)
        .subscribe(next => {
          this.listContract.unshift(next);
          this.contractForm.reset({
            contractId: '',
            customerId: '',
            serviceId: '',
            contractStarDate: '',
            contractEndDate: '',
            contractDeposits: '',
            contractTotal: ''
          });
          this.ngOnInit();
        }, error => console.log(error));
    }
  }

  deleteContract() {
    const contract = this.listContract[this.i];
    this.contractService.deleteContract(this.i).subscribe(
      () => {
        this.listContract = this.listContract.filter(t => t.id !== contract.id);
      });
    this.ngOnInit();
  };

  checkDelete(i: number, cid: string) {
    this.i = i;
    this.contractId = cid;
  };

  changContract(contract: Contract, i: number) {
    this.contractForm.patchValue(contract);
    this.i = i;
    this.checkForm = true;
  };

  editContract() {
    if (this.contractForm.valid) {
      const {value} = this.contractForm;
      const data = {
        ...this.contract,
        ...value
      };
      this.contractService.updateContract(data, this.i).subscribe(
        next => {
          this.contractForm.reset({
            contractId: '',
            customerId: '',
            serviceId: '',
            contractStarDate: '',
            contractEndDate: '',
            contractDeposits: '',
            contractTotal: ''
          });
          this.ngOnInit();
          this.checkForm = false;
        },
        error => console.log(error));
    }
  };

  resetForm() {
    this.checkForm = false;
    this.contractForm.reset({
      contractId: '',
      customerId: '',
      serviceId: '',
      contractStarDate: '',
      contractEndDate: '',
      contractDeposits: '',
      contractTotal: ''
    });
  }

  end: string;
  star: string;
  error = false;
  q: number;

  compareTwoDates() {
    let dateEnd: string[];
    let dateStar: string[];
    dateEnd = this.end.split('-');
    dateStar = this.star.split('-');
    let dateNumberEnd = (parseInt(dateEnd[0]) * 12 * 365) + (parseInt(dateEnd[1]) * 30) + (parseInt(dateEnd[2])) ;
    let dateNumberStar = (parseInt(dateStar[0]) * 12 * 365) + (parseInt(dateStar[1]) * 30) + (parseInt(dateStar[2])) ;
    if (dateNumberEnd <= dateNumberStar) {
      this.error = true;
    } else
      this.error = false;
  }
}

function numberValidator(formControl: FormControl) {
  if (formControl.value > 0) {
    return null;
  }
  return {number: true};
};

function dateValidator(formControl: FormControl) {
  let date1: string[];
  date1 = formControl.value.split('-');
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
  const m_date = o_date.formatToParts().reduce(f_date, {});
  let dateNumber = (parseInt(date1[0]) * 365) + (parseInt(date1[1]) * 30) + (parseInt(date1[2])) ;
  let dateNumberNow = (parseInt(m_date.year) * 365) + (parseInt(m_date.month) * 30) + (parseInt(m_date.day)) ;
  if (dateNumber < dateNumberNow) {
    return {checkDate: true};
  }
  return null;
}




