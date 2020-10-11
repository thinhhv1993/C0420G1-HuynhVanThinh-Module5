import {Component,OnInit} from '@angular/core';
import {IBlog} from '../model/IBlog';
import { ListBlogsService } from '../service/list-blogs.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hackernews',
  templateUrl: './hackernews.component.html',
  styleUrls: ['./hackernews.component.scss']
})
export class HackernewsComponent implements OnInit {
  index: number;
  showDong = "all";

  listBlog: IBlog[] = [];

  addFormIBlog  : FormGroup;
  editFormIBlog  : FormGroup;

  constructor(private fb: FormBuilder,private listBlogService : ListBlogsService) {
  }

  ngOnInit(): void {
    this.listBlog = this.listBlogService.getAll();
    this.addFormIBlog = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      url: ['', [Validators.required, urlValidator]],
    });
    this.editFormIBlog = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      url: ['', [Validators.required, urlValidator]],
    });
  }


  addIbBlog() {
    this.listBlogService.addIBlog(this.addFormIBlog.value);
    this.addFormIBlog.reset();
  }

  editIBlog(){
    this.listBlogService.editIBlog(this.editFormIBlog.value,this.index);
    this.editFormIBlog.reset();
  }

  changeIbBlog(value, index) {
    this.editFormIBlog.patchValue(value);
    this.index = index;
  };

  deleteIbBlog(index) {
    this.listBlogService.deleteIbBlog(index);
  };

  getShowDong(index : number){
    const all = this.showDong === 'all';
    const even = this.showDong === 'even' && (index % 2 !==0);
    const odd = this.showDong === 'odd' && (index % 2 ==0);
    return all || even || odd;
  }

}

function urlValidator(formControl: FormControl) {
  if (formControl.value.includes('.com')) {
    return null;
  }
  return { urlError : true };
}
