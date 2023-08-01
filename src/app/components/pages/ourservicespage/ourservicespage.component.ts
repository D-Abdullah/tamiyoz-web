import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-ourservicespage',
  templateUrl: './ourservicespage.component.html',
  styleUrls: ['./ourservicespage.component.scss'],
})
export class OurservicespageComponent implements OnInit {
  title1: string =
    this.commonService.getDirection() == 'ltr'
      ? 'Our Services'
      : 'خدماتنا';

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.insertTitleHeaderMain(this.title1);
    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertSubTitleHeader('');
    this.commonService.insertAfterSubTitleHeader('');

    this.commonService.setTitle(this.title1);
  }
}
