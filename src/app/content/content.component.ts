import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getContents();
    this.createContentUpdateForm();
  }

  contentUpdateForm!: FormGroup;
  newContent: boolean = false;

  contents: Array<Content> = [];
  contentsList: Array<Content> = [];

  getContents() {
    this.service.getContents().subscribe((result) => {
      this.contentsList = result;
      this.getPageEvent(this.pageEvent);
    });
  }

  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0,
  };
  length: number | undefined;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  getPageEvent(event: any) {
    const firstIndex = event.pageIndex * event.pageSize;
    const lastIndex = firstIndex + event.pageSize;
    this.contents = this.contentsList.slice(firstIndex, lastIndex);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = this.contentsList.length;
  }

  createContentUpdateForm() {
    this.contentUpdateForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onNewContent() {
    this.newContent = !this.newContent;
  }

  onCanceled(event: any) {
    event.target.closest('div').querySelectorAll('button')[0].hidden = true;
    event.target.closest('div').querySelectorAll('button')[1].hidden = false;
    this.onBack();
  }

  onBack() {
    this.onClear();
    this.newContent = !this.newContent;
  }

  onClear() {
    this.contentUpdateForm.reset();
  }

  onUpdateContent(formData: any, formDirective: FormGroupDirective) {
    if (this.contentUpdateForm.valid) {
      this.updateContent(this.contentUpdateForm.value);
      this.onClear();
      formDirective.resetForm();
    }
  }

  updateContent(content: any) {
    this.service.setUpdateContent(content).subscribe((r) => {
      this.getContents();
    });
  }

  get isUserAuthenticated() {
    return this.service.isAuthenticated;
  }

  onDeleteContent(id:any) {
    this.service.deleteContent(id).subscribe((r) => {
      this.getContents();
    });
  }
}
