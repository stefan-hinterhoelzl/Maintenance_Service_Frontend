import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Maintenance-Service-Frontend';

  constructor(private auth: AuthService, private router: Router) {}
  

  
  isAuthenticated: firebase.default.User;
  private authstatusSubscription;

  ngOnInit(): void {
    this.authstatusSubscription = this.auth.currentAuthStatus.subscribe(authstatus => {
      this.isAuthenticated = authstatus
      console.log(this.isAuthenticated);
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

  

}
