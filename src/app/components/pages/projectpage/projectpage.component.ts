import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-projectpage',
  templateUrl: './projectpage.component.html',
  styleUrls: ['./projectpage.component.scss'],
})
export class ProjectpageComponent implements OnInit {
  responseData: any = {};

  imageUrl = this.stationsService.stationImageUrl;

  idlink: any;

  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'News' : 'الأخبار';
  title1Link: string = '/news';
  title2: any;
  title2Link: any;

  constructor(
    private commonService: CommonService,
    private stationsService: StationsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOneProject();
    this.title2Link = `/news-page/` + this.idlink;

    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
    this.commonService.insertSubTitleHeaderLink(this.title2Link);

    this.commonService.insertAfterSubTitleHeader('');
  }

  getOneProject() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.idlink = params.get('id');
    });

    this.stationsService.getOneProject(this.idlink).subscribe(
      (res: any) => {
        this.responseData = res.data;
        this.title2 = this.responseData.name;
        this.commonService.insertSubTitleHeader(`> ` + this.title2);
        this.commonService.insertTitleHeaderMain(this.title2);
        this.commonService.setTitle(this.title2);

        // console.log(this.responseData);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
