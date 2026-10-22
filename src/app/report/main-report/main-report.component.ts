import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-main-report',
  templateUrl: './main-report.component.html',
  styleUrls: ['./main-report.component.css']
})
export class MainReportComponent implements OnInit {
  @Input() reportId: any = null;
  reportData: any[] = [];
  loading: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport(): void {
    this.loading = true;
    this.api.getStageWiseReport().subscribe({
      next: (e: any) => {
        if (e.code === 200) {
          this.reportData = e.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
