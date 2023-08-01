import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import AOS from "aos";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/services/common.service';
import { StationsService } from 'src/app/services/stations.service';

import { Loader } from '@googlemaps/js-api-loader';




@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  responseData: any = {};

  imageUrl = this.stationsService.stationImageUrl;

  // fileUrl = this.stationsService.stationsFileUrl;

  idlink: any;
  direction = this.commonService.getDirection();

  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'Marketing' : 'التسويق';
  title1Link: string = '/marketing';

  title2: any;
  title2Link: any;

  closeResult = '';

  lat: any;
  lng: any;

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
        items: 3,
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

  projectImgsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  map_url: any;

  constructor(
    private modalService: NgbModal,
    private stationsService: StationsService,
    private commonService: CommonService,
    private router: ActivatedRoute
  ) {}

  googleCustomMapModal() {
    let loader = new Loader({
      apiKey: 'AIzaSyC7EZmrvFGBhKwUmLi-bh8Jqw6tIdmZEa0',
      version: 'weekly',
      // libraries: ['places'],
    });

    loader.load().then(() => {
      const image = {
        url: './assets/img/tamiyoz-map1.png',
        scaledSize: new google.maps.Size(60, 60),
      };
      const map = new google.maps.Map(
        document.getElementById('mapModal') as HTMLElement,
        { center: { lat: this.lat, lng: this.lng }, zoom: 16 }
      );

      const marker = new google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        map,
        title: 'Tamiyoz Map',
        icon: image,
      });
      marker.addListener('click', () => {
        window.open(this.map_url, '_blank');
      });
      // map.addListener('resize', () => {
      //   map.setZoom(8);
      // });
    });
  }

  openMap(content: any) {
    this.modalService.open(content, { size: 'xl' });
    this.googleCustomMapModal();
  }

  googleCustomMap() {
    let loader = new Loader({
      apiKey: 'AIzaSyC7EZmrvFGBhKwUmLi-bh8Jqw6tIdmZEa0',
      version: 'weekly',
      // libraries: ['places'],
    });

    loader.load().then(() => {
      const image = {
        url: './assets/img/tamiyoz-map1.png',
        scaledSize: new google.maps.Size(60, 60),
      };
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: this.lat, lng: this.lng },
          zoom: 12,
        }
      );
      new google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        map,
        title: 'Tamiyoz Map',
        icon: image,
      });
    });
  }

  ngOnInit(): void {
    this.getOneProject();

    this.title2Link = `/company/` + this.idlink;

    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
    this.commonService.insertSubTitleHeaderLink(this.title2Link);
    this.commonService.insertAfterSubTitleHeader('');
    AOS.init();

    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      // offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  }

  getOneProject() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.idlink = params.get('id');
    });

    this.stationsService.getOneProject(this.idlink, 'companies').subscribe(
      (res: any) => {
        this.responseData = res.data;
        console.log('company data', this.responseData);
        this.title2 = this.responseData.name;
        this.commonService.insertSubTitleHeader(`> ` + this.title2);
        this.commonService.insertTitleHeaderMain(this.title2);
        this.commonService.setTitle(this.title2);

        this.lat = parseFloat(this.responseData.lat);

        this.lng = parseFloat(this.responseData.lon);

        this.map_url =
          'https://maps.google.com/maps?q=' +
          this.lat +
          ',' +
          this.lng +
          '&hl=es&z=14&amp&output=embed';

        this.googleCustomMap();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  goToLink(url: any) {
    window.open(url, '_blank');
  }
}
