import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
})
export class MarketingComponent implements OnInit {
  responseData: any[] = [];

  imageUrl = this.stationsService.stationImageUrl;

  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'Marketing' : 'التسويق';
  title1Link: string = '/marketing';

  constructor(
    private commonService: CommonService,
    private stationsService: StationsService
  ) {}

  ngOnInit(): void {
    this.commonService.insertTitleHeaderMain(this.title1);
    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
    this.commonService.insertSubTitleHeader('');
    this.commonService.insertAfterSubTitleHeader('');

    this.getSomeProjects();

    this.commonService.setTitle(this.title1);
  }

  getSomeProjects() {
    this.stationsService.getSomeProjects('companies').subscribe(
      (res: any) => {
        this.responseData = res.data;
        // console.log(this.responseData);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  projectsArray: any = [
    {
      imgName: 'assets/img/projects/projects1.jpg',
      projectTitle: 'شركة الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects2.jpg',
      projectTitle: 'شركة الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects3.jpg',
      projectTitle: 'شركة الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects4.jpg',
      projectTitle: 'شركة الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects2.jpg',
      projectTitle: 'شركة الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects3.jpg',
      projectTitle: 'شركة الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects3.jpg',
      projectTitle: 'مشروع الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects2.jpg',
      projectTitle: 'مشروع الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
  ];
}
