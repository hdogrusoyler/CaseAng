import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['./user-update-modal.component.css'],
})
export class UserUpdateModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<UserUpdateModalComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createTitleUpdateForm();
    if (this.data.id > 0) {
      this.setUserFormValue();
    }
  }

  userUpdateForm!: FormGroup;
  roles: Array<any> = [
    { key: 'Admin', value: 'Admin' },
    { key: 'User', value: 'User' },
  ];

  createTitleUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  setUserFormValue() {
    this.userUpdateForm.setValue(this.data);
  }

  onUpdateUser() {
    if (this.userUpdateForm.valid) {
      this.userUpdateForm.value.id = this.data.id;
      this.updateUser(this.userUpdateForm.value);
    }
  }

  onSignInUser() {
    if (this.userUpdateForm.valid) {
      this.userUpdateForm.value.id = this.data.id;
      this.signInUser(this.userUpdateForm.value);
    }
  }

  signInUser(user: any) {
    this.onClose();
    this.service.signin(user).subscribe((r) => {
      this.router.navigate(['/']).then(() => this.router.navigate(['admin']));
      
    });
  }

  updateUser(user: any) {
    this.onClose();
    this.service.setUpdateUser(user).subscribe((r) => {
      this.router.navigate(['/']).then(() => this.router.navigate(['admin']));
      
    });
  }

  onClose() {
    this.dialogRef.close(false);
  }

  get isUserAuthenticated():boolean {
    return this.service.isAuthenticated;
  }
}
