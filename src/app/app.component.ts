import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SessionUserDetails } from './common_modules/session_storage/SessionUserDetails';
import { ProposalComponent } from './proposal/proposal.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(ProposalComponent)
  proposalComp!: ProposalComponent;

  isdiabled : boolean = false

  title = 'FACO';
  //find a better alternative for 
  isLoggedIn = false           //
  //this
  isCollapsed = false;


  isHaveNotifications : boolean = false;
  notificationCOunt : number = 0;

  route = ''

  collapseMenu() {
    this.isCollapsed ? this.isCollapsed = false : this.isCollapsed = true;
  }

  constructor(public router: Router, private api: ApiService, private message: NzNotificationService) {
  }

  sideMenu = []
  userDetails = {
    BRANCH_ID: '',
    NAME: "",
    ROLE_ID: '',
    USER_ID: ''
  }

  userExtraInformation = {
    ROLE: '',
    BRANCH: ""
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getNotifications()
    },5000)
    if (SessionUserDetails.checkSessionStorage()) {
      this.login();
     
    
    }
    else {
      this.router.navigate(['login']);
      
 

      this.route = 'login';
     
    }

    if (window.screen.availWidth < 1000) {
      this.isCollapsed = true
    }

    window.onpopstate = function (e) {
      // this.onBackButtonPressed()
      console.log("event", e)
      // alert("Pressing back button can lead to unexpected behaviour!");
      history.forward();
    }
    
  }


  login() {
    console.log("userDetails", this.userDetails);
    this.getUser();
    this.getSideMenu();
    this.router.navigate(['/dashboard']);
    this.route = 'tabs';
  }

  passwordReset() {
    this.route = 'passReset';
    this.router.navigate(['reset-password'])
  }

  gotoLogin() {
    this.router.navigate(['login']);
    this.route = 'login';
  }

  user: string = '';


  getUser() {
    this.userDetails = SessionUserDetails.getSessionStorage();

    this.api.getUserBranch(Number(this.userDetails.BRANCH_ID)).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.userExtraInformation.BRANCH = res['data'][0]['BRANCH_NAME']
        }
      }
    })

    this.api.getUserRole(Number(this.userDetails.ROLE_ID)).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.userExtraInformation.ROLE = res['data'][0]['NAME']
        }
      }
    })
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  getSideMenu() {

    this.api.getSideMenu(this.userDetails.ROLE_ID).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data']) {

          this.sideMenu = res['data'];
        }
        else {
          this.message.error("Internal server Error!", '')
        }
      },
      error: () => {
        this.message.error("Internal server Error!", '')
      }
    })
  }




  disableProposal(route:any){
    // if(!this.isdiabled  && route == '/notifications'){

    //   this.isdiabled = true
    // }

    // if(this.isdiabled  && route == '/dashboard'){

    //   this.isdiabled = false
    // }

    
    //  if(this.isdiabled && route == '/notifications'){
    //   this.isdiabled = true
     
    // }
    

  }

  getNotifications() {
    // Retrieve branchId and userId from sessionStorage
    const branchId = Number(sessionStorage.getItem('BRANCH_ID'));
    const userId = Number(sessionStorage.getItem('USER_ID'));
  
    // Check if the IDs are valid
    if (!branchId || !userId) {
      console.error("Branch ID or User ID is missing or invalid. Ensure sessionStorage values are set correctly.");
      return;
    }
  
    console.log("Fetching notifications for:", { branchId, userId });
  
    // API call to fetch notifications
    this.api.getNotifcations(branchId, userId, 'A').subscribe({
      next: (res) => {
        if (res['code'] === 200) {
          console.log("Notification data retrieved:", res['data']);
          this.isHaveNotifications = res['data'].length > 0;
          this.notificationCOunt = res['data'].length;
        } else {
          console.warn("Unexpected API response code:", res['code']);
        }
      },
      error: (err) => {
        console.error("Error while fetching notifications:", err);
      }
    });
  }
  




}
