import {Customer} from './customer';
import {Service} from './service';

export class Contract {
  id: number;
  contractId: string;
  customerId: number;
  customer?: Customer;
  serviceId: number;
  service?: Service;
  contractStarDate: string;
  contractEndDate: string;
  contractDeposits: number;
  contractTotal: number;
}
