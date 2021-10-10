import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model';
import { ServiceService } from '../service.service';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { UserUpdateModalComponent } from './user-update-modal/user-update-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private service: ServiceService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  users: Array<User> = [];
  usersList: Array<User> = [];

  getUsers() {
    this.service.getUsers().subscribe((result) => {
      this.usersList = result;
      console.log(this.usersList)
      this.getPageEvent(this.pageEvent);
    });
  }

  displayedColumns: string[] = ['id', 'name', 'role', 'password', 'actions'];
  
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
    this.users = this.usersList.slice(firstIndex, lastIndex);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = this.usersList.length;
  }

  
  onDeleteTitleModal(titleId: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = titleId;
    this.dialog.open(UserDeleteModalComponent, dialogConfig);
  }

  onUpdateTitleModal(title:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = title; //this.titles.map(({ Id }) => id); //this.titles.filter(_ => _.id === id);
    this.dialog.open(UserUpdateModalComponent, dialogConfig);
  }

  onAddTitleModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { id: 0 };
    this.dialog.open(UserUpdateModalComponent, dialogConfig);
  }

}
