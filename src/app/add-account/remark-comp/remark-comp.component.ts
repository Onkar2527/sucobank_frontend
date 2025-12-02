import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BasicInfo } from 'src/app/models/basicInfo';
import { ExtraInfo } from 'src/app/models/extra-info';
import { RemarkModel } from 'src/app/models/remark-model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-remark-comp',
  templateUrl: './remark-comp.component.html',
  styleUrls: ['./remark-comp.component.css']
})
export class RemarkCompComponent implements OnInit, AfterViewInit {

  @Input() APPLICAT_ID!: number;
  TableLoading: boolean = false;
  remark_table_loading: boolean = false;
  Tabs: ExtraInfo[] = []

  show_remark: boolean = false;

  show_cmid: boolean = false;

   USER_ID = Number(sessionStorage.getItem("USER_ID"));


  @Input() basicInfo: BasicInfo = new BasicInfo();
  // basicInfo: BasicInfo = new BasicInfo();

  REMARK_DATA: RemarkModel[] = [
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
    // { ID: 1, USER_NAME: 'Test BA', ROLE: 'MAKER', REMARK: 'fsdgfsd dfg dhsfgdhfsdhfgdshf dghfsffsd f', REMARK_DATE: '14/10/2023 16:43', APPLICANT_ID: 230, USER_ID: 8 },
  ];

  REMARK: string = '';

  CMID: string = '';
  getRemarkData() {
    this.api.getAllRemark(this.APPLICAT_ID).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.REMARK_DATA = res['data'];
        }
      }
    })
  }

  createRemark(data: RemarkModel) {
    this.api.createRemark(data).subscribe({
      next: (res) => {
        if (res['code'] == 200) {

        }
      }
    })
  }

  constructor(private api: ApiService, private message: NzNotificationService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.APPLICAT_ID) {
      this.getBasicInfo().then((data: any) => {
        this.basicInfo = data;
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.APPLICAT_ID && !this.basicInfo.ID) {
      this.getBasicInfo().then((data: any) => {
        this.basicInfo = data;
        this.cdr.detectChanges();
      });
    }
  }



 
  saveBasicInfo() {
    if (this.APPLICAT_ID && this.basicInfo.ACCOUNT_NUMBER && this.basicInfo.CMID) {
      this.api.updateBasicAcc(this.APPLICAT_ID, this.basicInfo.ACCOUNT_NUMBER, this.basicInfo.CMID).subscribe({
        next: (res) => {
          if (res.code == 200) {
            this.message.success("Account number updated successfully!", '');
            this.getBasicInfo(); // refresh
          } else {
            this.message.error("Failed to update account number", '');
          }
        }
      });
    } else {
      this.message.error("Missing ID or Account Number", '');
    }
  }

  getBasicInfo() {
    return new Promise((resolve, reject)=>{
      console.log("id to get data Basic", this.APPLICAT_ID);

    this.api.getBasic(this.APPLICAT_ID).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {

          resolve(res['data'][0]) 
          console.log("API Data Row:", res['data'][0]);
          console.log("Assigned basicInfo:", this.basicInfo);
          this.cdr.detectChanges();  // force refresh
        }
      }
    });
    })
  }

  




}
