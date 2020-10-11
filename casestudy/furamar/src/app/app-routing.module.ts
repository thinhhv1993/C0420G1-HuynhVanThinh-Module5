import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ServiceComponent} from './service/service.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {EmployeeComponent} from './employee/employee.component';
import {CustomerComponent} from './customer/customer.component';
import {ContractComponent} from './contract/contract.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'contract', component: ContractComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
