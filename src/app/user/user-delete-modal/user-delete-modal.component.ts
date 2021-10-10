import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {

  constructor(
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<UserDeleteModalComponent>
  ) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.dialogRef.close(false);
    this.service.deleteUser(this.data).subscribe(data => {
      this.router.navigate(['/']).then(() => {
        this.router.navigate(['admin']);
      });      
    })
  }

  onClose() {
    this.dialogRef.close(false);
  }

}
