
import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {


  notification: Notification = new Notification()

  constructor(private api: ApiService) { }

  async getUserToNotify(branchId: number, roleId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.getUserToNotify(branchId, roleId).subscribe({
        next: (response: any) => {
          if (response) {
            resolve(response['data'][0]);
          } else {
            reject('USER_ID not found in API response');
          }
        }, error: () => {
          reject('Internal error');
        }, complete: () => {

        }
      }
      );
    });
  }

  async getCurrentUserDetails(branchId: number, roleId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.getCurrentUserDetails(branchId, roleId).subscribe({
        next: (response: any) => {
          if (response) {
            resolve(response['data'][0]);
          } else {
            reject('USER_ID not found in API response');
          }
        }, error: () => {
          reject('Internal error');
        }, complete: () => {

        }
      }
      );
    });
  }



  async generateNotification(applicantId: number, trackId: number, step: string) {

    let branchId = Number(sessionStorage.getItem('BRANCH_ID'))
    let userId = Number(sessionStorage.getItem('USER_ID'))
    let roleId = Number(sessionStorage.getItem('ROLE_ID'))

    let userName = 'USER1'

    let branchName = 'BRANCH1'

    this.notification.APPLICANT_ID = applicantId;
    // romove hardcoded user
    this.notification.BRANCH_ID = branchId;
    this.notification.CREATED_USER_ID = userId
    this.notification.STATUS = "A"


    if (branchId && userId && roleId && applicantId) {

      console.log("here data needed for ba notify", trackId, step, roleId);

      if (!trackId && roleId == 1 && step == "I") {
           this.notification.STATUS = "N";
           let USER = await this.getUserToNotify(branchId, 2);
        this.notification.USER_ID = USER['ID'];
        let CURRENT_USER = await this.getCurrentUserDetails(branchId, roleId)
        this.notification.NOTIFICATION_DETAIL = `${CURRENT_USER['NAME']} created new proposal in branch ${branchName}`
        this.api.createNotifications(this.notification).subscribe(
          (res) => {
            console.log("here is n res", res);
  
          }
        )
        
         USER = await this.getUserToNotify(branchId, 3)
        this.notification.USER_ID = USER['ID'];
      }

      if (trackId == 1 && step == 'F' && roleId == 1) {
        let USER = await this.getUserToNotify(branchId, 2)
        let CURRENT_USER = await this.getCurrentUserDetails(branchId, roleId)
        this.notification.NOTIFICATION_DETAIL = `${CURRENT_USER['NAME']} from ${branchName} sent proposal for verification`
        this.notification.USER_ID = USER['ID'];
      }

      if (trackId == 2 && step == 'B' && roleId == 2) {
        let USER = await this.getUserToNotify(branchId, 1)
        let CURRENT_USER = await this.getCurrentUserDetails(branchId, roleId)
        this.notification.NOTIFICATION_DETAIL = `${CURRENT_USER['NAME']} from ${branchName} sent proposal to refill`
        this.notification.USER_ID = USER['ID'];
      }

      if (trackId == 2 && step == 'F' && roleId == 2) {
        let USER = await this.getUserToNotify(branchId, 3)
        let CURRENT_USER = await this.getCurrentUserDetails(branchId, roleId)
        this.notification.NOTIFICATION_DETAIL = `${CURRENT_USER['NAME']} from ${branchName} sent proposal to Verification`
        this.notification.USER_ID = USER['ID'];
      }

      if (trackId == 3 && step == 'B' && roleId == 3) {
        this.notification.STATUS = "N"
        let USER = await this.getUserToNotify(branchId, 1)
        this.notification.USER_ID = USER['ID']
        let CURRENT_USER = await this.getCurrentUserDetails(branchId, roleId)
        this.notification.NOTIFICATION_DETAIL = `${CURRENT_USER['NAME']} from ${branchName} sent proposal to refill`
        this.api.createNotifications(this.notification).subscribe(
          (res) => {
            console.log("here is n res", res);
  
          }
        )
        USER = await this.getUserToNotify(branchId, 2)
        this.notification.USER_ID = USER['ID'];
      }

      if (trackId == 3 && step == 'F' && roleId == 3) {
        this.notification.STATUS = "N"
        let USER = await this.getUserToNotify(branchId, 1)
        this.notification.USER_ID = USER['ID']
        let CURRENT_USER = await this.getCurrentUserDetails(branchId, roleId)
        this.notification.NOTIFICATION_DETAIL = `Account from ${CURRENT_USER['NAME']} has been created`
        this.api.createNotifications(this.notification).subscribe(
          (res) => {
            console.log("here is n res", res);
  
          }
        )
        
         USER = await this.getUserToNotify(branchId, 2)
        this.notification.USER_ID = USER['ID'];
      }
      console.log("Notification data", this.notification);


      this.api.createNotifications(this.notification).subscribe(
        (res) => {
          console.log("here is n res", res);

        }
      )
    }
    else {
      console.log("required filed", branchId, userId, roleId, applicantId);

    }


  }


  async closeNotification(applicantId: number, userId: number, Notification_id?: number) {

    if (Notification_id) {
      this.api.closeNotification(Notification_id).subscribe({
        next : (response)=>{
          if(response['code']==200){
            alert('closed')
          }
        },error : (error)=>{
          console.log("error", error);
        }
      })

    }
    else {
     this.api.getNotifcations(Number(sessionStorage.getItem('BRANCH_ID')),userId, 'A').subscribe(
      {
        next: (res)=>{
             if(res['code']==200){
                this.api.closeNotification(res['data'][0].ID).subscribe({
                  next : (response)=>{
                    if(response['code']==200){
                      alert('closed')
                    }
                  },error : (error)=>{
                    console.log("error", error);
                  }
                })
             }

        }, error :(err)=>{
            console.log("err", err);
            
        }
      }
     )

    }


  }



}
