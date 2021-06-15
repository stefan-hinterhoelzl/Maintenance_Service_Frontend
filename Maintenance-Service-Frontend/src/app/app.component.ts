import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DeleteTicketDialogComponent } from './delete-ticket-dialog/delete-ticket-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { AlertService } from './services/alertService';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Maintenance-Service-Frontend';

  constructor(private auth: AuthService, private router: Router, public dialog: MatDialog, private alert: AlertService) {}
  

  
  isAuthenticated: firebase.default.User;
  private authstatusSubscription;

  ngOnInit(): void {
    this.authstatusSubscription = this.auth.currentAuthStatus.subscribe(authstatus => {
      this.isAuthenticated = authstatus
    });
    
  }

  async signOut(){
    await this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  ngOnDestroy(): void {
    this.authstatusSubscription.unsubsribe();
  }

  openDeleteDialog(): void {
    const dialogConfigDelete = new MatDialogConfig();

    dialogConfigDelete.disableClose = true;
    dialogConfigDelete.autoFocus = true;

    dialogConfigDelete.data= {
      email: this.isAuthenticated.email,
    }
    
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, dialogConfigDelete);

    dialogRef.afterClosed().pipe(take(1)).subscribe(async (data) => {
      if (data == true) {
        await this.auth.deleteUser().then(() => {
          this.alert.success("Benutzer "+this.isAuthenticated.email+" wurde gelöscht.")
          this.router.navigate(['login']);
        });
      }
    });
  }

  async sendVerificationLink() {
    await this.auth.sendVerificationLink(this.isAuthenticated).then(() => {
      this.alert.success("Link wurde gesendet")
    });
  }

}
