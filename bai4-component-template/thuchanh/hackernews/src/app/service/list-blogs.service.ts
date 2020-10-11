import {Injectable} from '@angular/core';
import {IBlog} from '../model/IBlog';

@Injectable({
  providedIn: 'root'
})
export class ListBlogsService {

  IBlogEdit: IBlog;
  show = false;
  showDong = "all";

  constructor() {
  }

  listBlog: IBlog[] = [
    {
      title: 'The Evolution of Async JavaScript: From Callbacks, to Promises, to Async/Await',
      url: 'https://medium.freecodecamp.org/the-evolution-of-async-javascript-from-callbacks-to-promises-to-async-await-e73b047f2f40'
    },
    {
      title: 'Game of Life',
      url: 'https://thefullsnack.com/posts/game-of-life.html'
    },
    {
      title: 'Nguyên tắc thiết kế REST API',
      url: 'https://medium.com/eway/nguyên-tắc-thiết-kế-rest-api-23add16968d7'
    },
    {
      title: 'Why You Only Need to Test with 5 Users',
      url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/'
    }
  ];

  getAll(){
    return this.listBlog;
  }
  addIBlog(iBlog :IBlog) {
    this.listBlog.push(iBlog);
    this.show = false;
  };

  editIBlog(value ,index) {
    this.IBlogEdit = value;
    console.log(this.IBlogEdit.url);
    if (this.IBlogEdit.url != "") {
      this.listBlog[index].url = this.IBlogEdit.url;
    }
    if (this.IBlogEdit.title != "") {
      this.listBlog[index].title = this.IBlogEdit.title;
    }
    this.show = false;
  };

  deleteIbBlog(index) {
    this.listBlog.splice(index,1);
  };

  getShowDong(index : number, showDong : string){
    const all = this.showDong === 'all';
    const even = this.showDong === 'even' && (index % 2 ===0);
    const odd = this.showDong === 'odd' && (index % 2 !==0);
    return all || even || odd;
  }
}
