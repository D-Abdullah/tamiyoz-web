import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OurservicesService } from 'src/app/services/ourservices.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-singleservice',
  templateUrl: './singleservice.component.html',
  styleUrls: ['./singleservice.component.scss'],
})
export class SingleserviceComponent implements OnInit {
  responseData: any = {};
  imageUrl = this.ourservicesService.ourservicesImageUrl;
  idlink: any;

  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'Our Services' : 'خدماتنا';
  title1Link: string = '/ourservices';
  title2Link : any;
  title2: any;

  constructor(
    private commonService: CommonService,
    private ourservicesService: OurservicesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOneService();
    this.title2Link = `/single-service/` + this.idlink;
    
    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
    this.commonService.insertSubTitleHeaderLink(this.title2Link);

    this.commonService.insertAfterSubTitleHeader('');

    

    
  }

  getOneService() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.idlink = params.get('id');
    });

    this.ourservicesService.getOneService(this.idlink).subscribe(
      (res: any) => {
        this.responseData = res.data;
        // console.log(this.responseData);
        
        this.title2 = this.responseData.name;
        this.commonService.insertSubTitleHeader(`> ` + this.title2);
        this.commonService.insertTitleHeaderMain(this.title2);
        this.commonService.setTitle(this.title2);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
