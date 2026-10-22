import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportList: any[] = [];
  loading: boolean = false;
  isDrawerVisible: boolean = false;
  selectedReportId: any = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.api.getAllReports().subscribe({
      next: (e: any) => {
        if (e.code === 200) {
          this.reportList = e.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  openReport(e: any): void {
    console.log("Clicked report object:", e);
    this.selectedReportId = e.ID;
    this.isDrawerVisible = true;
    console.log("selectedReportId:", this.selectedReportId);
    console.log("Drawer Open:", this.isDrawerVisible);
  }
}
