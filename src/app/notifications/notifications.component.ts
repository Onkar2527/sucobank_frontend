import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})




export class NotificationsComponent implements OnInit {

  
  pageIndex: any = '1';
  pageSize: any = '5';
  dataCount: any = '10';



  notifications :  any = []

  constructor(private router: Router, private api : ApiService) { }

  ngOnInit(): void {
  let branchId = Number(sessionStorage.getItem('BRANCH_ID'));
  let userId = Number(sessionStorage.getItem('USER_ID'));
  
  if(branchId && userId){
    this.api.getNotifcations(branchId,userId,'A').subscribe({
      next:(res)=>{
          if(res['code'] == 200){
            this.notifications = res['data']
            console.log("here i got n", this.notifications);
            
          }
      }
    })
  }
    


  }




  async navigateProposal(applicant_id: number, notification_id : number ) {



    this.router.navigate(['/proposal'], { queryParams: { APPLICANT_ID: applicant_id , NOTIFICATION_ID : notification_id} });

  }

}

export interface Notification {
  ID?: number; // Optional as it is auto-incremented
  APPLICANT_ID: number;
  USER_ID: number;
  BRANCH_ID: number;
  NOTIFICATION_DETAIL: string;
  CREATED_USER_ID: number;
  CREATED_ON_DATETIME?: Date; // Optional, default is the current timestamp
  LAST_MODIFIED_DATE?: string; // Optional, default value provided in the database
  STATUS?: string; // Optional, default is 'A'
}