import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HackernewsComponent} from './hackernews/hackernews.component';
const routes: Routes = [{
  path:'hackernews', component: HackernewsComponent,
  // children : [{
  //   path: 'hackernews', component: HackernewsComponent
  // }]
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
