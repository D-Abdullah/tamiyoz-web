import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StationsService } from 'src/app/services/stations.service';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-aboutuspage',
  templateUrl: './aboutuspage.component.html',
  styleUrls: ['./aboutuspage.component.scss'],
})
export class AboutuspageComponent implements OnInit {
  responseData: any = {};

  newHead: any;
  title1Link: string = '/app-aboutuspage';
  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'About Us' : 'من نحن';

  constructor(
    private commonService: CommonService,
    private titleService: Title,
    private stationsService: StationsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commonService.insertTitleHeaderMain(this.title1);
    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
    this.commonService.insertSubTitleHeader('');
    this.commonService.insertAfterSubTitleHeader('');

    this.commonService.setTitle(this.title1);

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
