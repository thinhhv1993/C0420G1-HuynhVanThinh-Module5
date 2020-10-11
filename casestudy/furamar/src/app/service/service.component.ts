import {Component, OnInit} from '@angular/core';
import {ServiceService} from './service.service';
import {Service} from '../model/service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ServiceService]
})
export class ServiceComponent implements OnInit {
  service: Service;
  listService: Service[] = [];
  serviceForm: FormGroup;
  serviceFormEdit: FormGroup;
  search="";
  i: number;
  q: number;
  term: string;

  constructor(private ServiceService1: ServiceService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      serviceId: ['', [Validators.required, Validators.pattern('^(DV)[\\d]{4}$')]],
      serviceName: ['', Validators.required],
      serviceAcreage: ['', [Validators.required, numberValidator]],
      serviceFloors: ['', [Validators.required, numberValidator]],
      serviceMaxNumberPeople: ['', [Validators.required, numberValidator]],
      serviceCost: ['', [Validators.required, numberValidator]],
      serviceStatus: ['', Validators.required],
      serviceRentalType: ['', [Validators.required]]
    });
    this.serviceFormEdit = this.fb.group({
      serviceId: ['', [Validators.required, Validators.pattern('^(DV)[\\d]{4}$')]],
      serviceName: ['', Validators.required],
      serviceAcreage: ['', [Validators.required, numberValidator]],
      serviceFloors: ['', [Validators.required, numberValidator]],
      serviceMaxNumberPeople: ['', [Validators.required, numberValidator]],
      serviceCost: ['', [Validators.required, numberValidator]],
      serviceStatus: ['', Validators.required],
      serviceRentalType: ['', [Validators.required]]
    });
    this.ServiceService1
      .searchByServiceName(this.search)
      .subscribe(next => (this.listService = next), error => (this.listService = []));
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const {value} = this.serviceForm;
      this.ServiceService1.createService(value)
        .subscribe(next => {
          this.listService.unshift(next);
          this.serviceForm.reset({
            serviceId: '',
            serviceName: '',
            serviceAcreage: '',
            serviceFloors: '',
            serviceMaxNumberPeople: '',
            serviceCost: '',
            serviceStatus: '',
            serviceRentalType: '',
          });
        }, error => console.log(error));
    }
  }

  deleteService() {
    const service = this.listService[this.i];
    this.ServiceService1.deleteService(this.i).subscribe(() => {
      this.listService = this.listService.filter(t => t.serviceId !== service.serviceId);
    });
  }

  checkDelete(i: number) {
    this.i = i;
  }

  changService(service: Service, i: number) {
    this.serviceFormEdit.patchValue(service);
    this.i = i;
  }

  editService(){
    if (this.serviceFormEdit.valid) {
      const { value } = this.serviceFormEdit;
      const data = {
        ...this.service,
        ...value
      };
      this.ServiceService1.updateService(data,this.i).subscribe(
        next => {
          this.ngOnInit();
        },
        error => console.log(error)
      );
    }
  }
}
function numberValidator(formControl: FormControl) {
  if (formControl.value > 0) {
    return null;
  }
  return {number: true};
}
