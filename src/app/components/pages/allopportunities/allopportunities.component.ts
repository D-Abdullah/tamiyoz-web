import { Component, OnInit } from '@angular/core';
import { ChancesService } from 'src/app/services/chances.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-allopportunities',
  templateUrl: './allopportunities.component.html',
  styleUrls: ['./allopportunities.component.scss'],
})
export class AllopportunitiesComponent implements OnInit {
  title1: string =
    this.commonService.getDirection() == 'ltr'
      ? 'Current Opportunities'
      : 'فرصنا الحالية';
  title1Link: string = '/allopportunities';

  responseData: any[] = [];

  imageUrl = this.chancesService.chancesImageUrl;

  constructor(
    private commonService: CommonService,
    private chancesService: ChancesService
  ) {}

  ngOnInit(): void {
    this.commonService.insertTitleHeaderMain(this.title1);
    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
    this.commonService.insertSubTitleHeader('');
    this.commonService.insertAfterSubTitleHeader('');

    this.getSomeChances();

    this.commonService.setTitle(this.title1);
  }

  getSomeChances() {
    this.chancesService.getSomeChances().subscribe(
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
  ];
}
