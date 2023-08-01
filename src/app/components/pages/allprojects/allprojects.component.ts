import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.scss'],
})
export class AllprojectsComponent implements OnInit {
  responseData: any[] = [];

  imageUrl = this.stationsService.stationImageUrl;

  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'News' : 'الأخبار';
  title1Link: string = '/news';

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
    this.stationsService.getSomeProjects('projects').subscribe(
      (res: any) => {
        this.responseData = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  projectsArray: any = [
    {
      imgName: 'assets/img/projects/projects1.jpg',
      projectTitle: 'مشروع الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects2.jpg',
      projectTitle: 'مشروع الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects3.jpg',
      projectTitle: 'مشروع الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects4.jpg',
      projectTitle: 'مشروع الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects2.jpg',
      projectTitle: 'مشروع الرابية',
      projectDescription: 'احد المشاريع التي قمت بتنفيذها شركة ديار المنار',
    },
    {
      imgName: 'assets/img/projects/projects3.jpg',
      projectTitle: 'مشروع الرابية',
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
