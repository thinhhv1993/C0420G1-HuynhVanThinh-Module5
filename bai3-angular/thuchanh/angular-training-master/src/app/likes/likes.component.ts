import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  constructor() { }
  likes = 0;

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  likeThis() {
    this.likes++;
  }
}
