import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SessionUserDetails } from '../common_modules/session_storage/SessionUserDetails';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  @Output() logined = new EventEmitter<boolean>();
  @Output() passwordReset = new EventEmitter<boolean>();

  USER_NAME = '';
  PASSWORD = '';
  isMobileView = false;

  isloginSpinning: boolean = false;
  isLogedIn: boolean = false;

  passwordPolicy: any;

  passwordVisible = false

  constructor(private api: ApiService, private router: Router, private message: NzNotificationService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }
  ngOnInit(): void {

    if (this.isLogedIn = true) {
      console.log(this.isLogedIn + "Hey there ")
      this.isLogedIn = false;
    }
    this.checkScreenSize();

    this.getPasswordPolicy();


  }

  getPasswordPolicy() {
    this.api.getPasswordPolicyData().subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data']) {
          this.passwordPolicy = res['data'];
        }
      }
    })
  }

  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 768;
  }

  login(): void {
    sessionStorage.clear();
    this.isloginSpinning = true;
    this.api.login(this.USER_NAME, this.PASSWORD).subscribe({
      next: (data) => {
        if (data['code'] == 200 && data['data']) {

          const verifyPasswordAndProceed = (policy: any) => {
            let passwordPatternStr = `^(?=(.*[A-Z]){${policy.FR_CAPITAL_LETTERS},})(?=(.*[a-z]){${policy.FR_SMALL_LETTERS},})(?=(.*\\d){${policy.FR_NUMBERS},})(?=(.*[\\W_]){${policy.FR_SYMBOLS},}).{${policy.PASSWORD_LENGTH},}$`
            let passwordPatternRegex = new RegExp(String.raw`${passwordPatternStr}`);

            if (!data['data']['PASSWORD_RESET_DATE']) {
              this.message.warning("Please reset the password to something secure", "");
              this.passwordReset.emit(true);
              this.isloginSpinning = false;
              return;
            }
            else if (!passwordPatternRegex.test(this.PASSWORD)) {
              this.message.warning("Password policy has been updated", "Please reset the password");
              this.passwordReset.emit(true);
              this.isloginSpinning = false;
              return;
            }
            else if (data['data']['DAYS_OF_RESET_PASS'] >= policy.FR_PASSWORD_RESET) {
              this.message.warning("Your password has been expired", "Please reset the password");
              this.passwordReset.emit(true);
              this.isloginSpinning = false;
              return;
            }
            else {
              SessionUserDetails.setSessionStorage(data['data']);
              this.logined.emit(true);
              this.isloginSpinning = false;
            }
          };

          if (this.passwordPolicy) {
            verifyPasswordAndProceed(this.passwordPolicy);
          } else {
            this.api.getPasswordPolicyData().subscribe({
              next: (res) => {
                if (res['code'] == 200 && res['data']) {
                  this.passwordPolicy = res['data'];
                  verifyPasswordAndProceed(this.passwordPolicy);
                } else {
                  this.message.error("Failed to fetch password policy from the database", "");
                  this.isloginSpinning = false;
                }
              },
              error: () => {
                this.message.error("Failed to fetch password policy from the database", "");
                this.isloginSpinning = false;
              }
            });
          }

        }
        else if (data['code'] == 404) {
          this.message.error("Username or Password not found!", '');
          this.isloginSpinning = false

        }
        else {
          this.message.error("Something went wrong!", '');
          this.isloginSpinning = false
        }

      },
      error: () => {
        this.isloginSpinning = false

      }

    })

  }

  passwordResetFn() {
    this.passwordReset.emit(true);
  }

}