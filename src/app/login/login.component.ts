import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserUpdateModalComponent } from '../user/user-update-modal/user-update-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params.returnUrl;
    });
  }

  ngOnInit(): void {}

  loginForm: FormGroup;
  userToken: string | undefined;
  TOKEN_KEY = 'token';
  returnUrl: string | undefined;

  onLogin() {
    if (this.loginForm.valid) {
      this.service.logIn(this.loginForm.value).subscribe(data => {
        this.service.saveToken(data);
        this.router.navigateByUrl('/' + this.returnUrl);
      }); 
    }
  }

  onLogout() {
    if (this.service.isAuthenticated) {
      this.router.navigateByUrl('/');
    }
  }

  get isUserAuthenticated() {
    return this.service.isAuthenticated;
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
