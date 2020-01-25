import { Component, isDevMode } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  private domain = isDevMode() ? 'localhost' : 'nishant-kumar.com';
  public logout_message: string;

  constructor(private cookie: CookieService,
    private userService: UserManagementService,
    private router: Router) { }

  ngOnInit() {
    this.logout();
  }

  /**
   * Function to logout.
   */
  public logout() {

    this.logout_message = "";

    let authToken = this.cookie.get('authToken'); 

    this.userService.logout(authToken)
      .subscribe((apiResponse) => {
       
        if (apiResponse.status === 200) {
          this.cookie.deleteAll('/', this.domain);
          this.cookie.deleteAll('/', 'www.' + this.domain);
          this.logout_message = apiResponse.message;
          // redirect to home page
          document.getElementById('logout-link').click();
        }

        else {
          console.log(apiResponse)
          this.logout_message = apiResponse.message;
          setTimeout(() => this.router.navigate(["/"]), 1000)
        }
      },
        (err) => {
          console.log('Server seems to be down.')
          console.log(err)
          this.logout_message = "Server seems to be down."
        });

  } // END logout()

} // END
