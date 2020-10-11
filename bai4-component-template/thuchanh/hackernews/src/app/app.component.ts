import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  public show = false;
  public show1 = false;

  toggle() {
    this.show = !this.show;
  }

  toggleAdd() {
    this.show1 = !this.show1;
  }
}
