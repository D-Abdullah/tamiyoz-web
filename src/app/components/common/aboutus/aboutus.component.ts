import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {
  responseData: any = {};


  constructor(
    private commonService: CommonService,
    private stationsService: StationsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPageById();
  }

  getPageById() {
    this.stationsService.getPageById(1).subscribe(
      (res: any) => {
        this.responseData = res.data;
        // console.log(this.responseData);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
