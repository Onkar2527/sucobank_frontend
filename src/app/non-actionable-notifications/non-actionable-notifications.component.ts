import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-non-actionable-notifications',
  templateUrl: './non-actionable-notifications.component.html',
  styleUrls: ['./non-actionable-notifications.component.css']
})
export class NonActionableNotificationsComponent implements OnInit {


  pageIndex: any = '1';
  pageSize: any = '5';
  dataCount: any = '10';

  notifications: any = []
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    let branchId = Number(sessionStorage.getItem('BRANCH_ID'));
    let userId = Number(sessionStorage.getItem('USER_ID'));

    if (branchId && userId) {
      this.api.getNotifcations(branchId, userId, 'N').subscribe({
        next: (res) => {
          if (res['code'] == 200) {
            this.notifications = res['data']
            console.log("here i got n", this.notifications);

          }
        }
      })
    }
  }

  async navigateProposal(applicant_id: number, notification_id: number) {
    this.router.navigate(['/proposal'], { queryParams: { APPLICANT_ID: applicant_id, NOTIFICATION_ID: notification_id } });
  }


  async markAsRead(notificationId : number){

    this.api.closeNotification(notificationId).subscribe({
      next : (response)=>{
        let branchId = Number(sessionStorage.getItem('BRANCH_ID'));
        let userId = Number(sessionStorage.getItem('USER_ID'));
    
        if (branchId && userId) {
          this.api.getNotifcations(branchId, userId, 'N').subscribe({
            next: (res) => {
              if (res['code'] == 200) {
                this.notifications = res['data']
                console.log("here i got n", this.notifications);
    
              }
            }
          })
        }
        console.log("non actionable notification sasved in history");
        

      },
      error: (err)=>{

      }
    })

  }

}
