import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@Component({
  selector: 'app-notifications-history',
  templateUrl: './notifications-history.component.html',
  styleUrls: ['./notifications-history.component.css']
})

export class NotificationsHistoryComponent implements OnInit {

  
  pageIndex: any = '1';
  pageSize: any = '5';
  dataCount: any = '10';

  notifications :  any = []
  constructor(private router: Router, private api : ApiService) { }

  ngOnInit(): void {
    let branchId = Number(sessionStorage.getItem('BRANCH_ID'));
  let userId = Number(sessionStorage.getItem('USER_ID'));
  
  if(branchId && userId){
    this.api.getNotifcations(branchId,userId,'H').subscribe({
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


  onChange(result: any): void {

    let date1 = `${new Date(result[0]).getDate()}-${new Date(result[0]).getMonth()+1}-${new Date(result[0]).getFullYear()}`
   console.log('Selected Time: ', date1 );
  }

}
