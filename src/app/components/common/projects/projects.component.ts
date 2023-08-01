import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/services/common.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  responseData: any[] = [];

  imageUrl = this.stationsService.stationImageUrl;

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
  ];

  projectOptions: OwlOptions = {
    // freeDrag: true,
    // fallbackEasing: 'linear',
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 2000,
    autoHeight: true,

    autoplayHoverPause: false,
    // dotsContainer: true,
    navText: [
      "<i class='bx bx-chevron-right'></i>",
      "<i class='bx bx-chevron-left'></i>",
    ],

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  constructor(
    private commonService: CommonService,
    private stationsService: StationsService
  ) {}

  ngOnInit(): void {
    this.getSomeProjects();
  }

  getSomeProjects() {
    this.stationsService.getSomeProjects('stations').subscribe(
      (res: any) => {
        this.responseData = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
