import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import AOS from "aos";
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StationsService } from 'src/app/services/stations.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ShopsService } from 'src/app/services/shops.service';

// Sweet Alert
import Swal from 'sweetalert2';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
  Validators,
} from '@angular/forms';

import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  formValue!: FormGroup;

  // modalIsValid: any;
  modalNameIsValid: any;
  modalPhoneIsValid: any;
  modalDurationIsValid: any;
  modalPropertyNameIsValid: any;
  modalEmailIsValid: any;
  modalTermsIsValid: any;
  modalActivityTypeIsValid: any;
  modalRegistrationNoIsValid: any;

  responseDataAddRente: any = {};
  responseData: any = {};
  responseDataShops: any[] = [];

  lat: any;
  lng: any;
  map_url: any;

  imageUrl = this.stationsService.stationImageUrl;
  imageShopUrl = this.shopsService.shopImageUrl;

  fileUrl = this.stationsService.stationsFileUrl;

  idlink: any;

  direction = this.commonService.getDirection();

  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'Projects' : 'المشاريع';
  title1Link: string = '/projects';
  title2: any;
  title2Link: any;

  // MODAL CLOSE
  closeResult = '';
  propertyName: any;
  propertyId: any;

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
  projectOptions: OwlOptions = {
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

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private stationsService: StationsService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private shopsService: ShopsService,
    private formBuilder: FormBuilder
  ) {}

  open(content: any, propertyName: any, propertyId: any) {
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

    this.propertyName = propertyName;
    this.propertyId = propertyId;

    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      propertyname: [this.propertyName, [Validators.required]],
      duration: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      comment: [''],
      terms: [false, [Validators.requiredTrue]],
      activityType: ['', [Validators.required]],
      registration_no: ['', [Validators.required]],
      // comment: ['', [Validators.minLength(10), Validators.required]],
      // imagename: ['postData.push(res)'],
    });
  }
  // openMap(content: any) {
  //   this.modalService
  //     .open(content, { ariaLabelledBy: 'modal-basic-title' })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       }
  //     );
  // }
  openMap(content: any) {
    this.modalService.open(content, { size: 'xl' });
    this.googleCustomMapModal();
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

  checkModalValidation() {
    if (this.formValue.controls['email'].invalid) {
      this.modalEmailIsValid = false;
    } else {
      this.modalEmailIsValid = true;
    }
    if (this.formValue.controls['activityType'].invalid) {
      this.modalActivityTypeIsValid = false;
    } else {
      this.modalActivityTypeIsValid = true;
    }
    if (this.formValue.controls['registration_no'].invalid) {
      this.modalRegistrationNoIsValid = false;
    } else {
      this.modalRegistrationNoIsValid = true;
    }
    if (this.formValue.controls['phone'].invalid) {
      this.modalPhoneIsValid = false;
    } else {
      this.modalPhoneIsValid = true;
    }
    if (this.formValue.controls['name'].invalid) {
      this.modalNameIsValid = false;
    } else {
      this.modalNameIsValid = true;
    }
    if (this.formValue.controls['duration'].invalid) {
      this.modalDurationIsValid = false;
    } else {
      this.modalDurationIsValid = true;
    }
    if (this.formValue.controls['propertyname'].invalid) {
      this.modalPropertyNameIsValid = false;
    } else {
      this.modalPropertyNameIsValid = true;
    }
    if (this.formValue.controls['terms'].invalid) {
      this.modalTermsIsValid = false;
    } else {
      this.modalTermsIsValid = true;
    }
    if (this.formValue.valid) {
      // this.addRente();
      // alert('تم ارسال الطلب بنجاح');
      this.addRente();
      this.modalService.dismissAll();
      Swal.fire({
        icon: 'success',
        title:
          this.direction == 'ltr'
            ? 'Request Submitted Successfully.'
            : 'تم ارسال الطلب بنجاح',
        confirmButtonText: this.direction == 'ltr' ? 'Ok' : 'تم',
        confirmButtonColor: '#0164ec',
        iconColor: '#0164ec',
      });
    }
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
          fullscreenControl: false,
          disableDefaultUI: true,
          keyboardShortcuts: false,
        }
      );

      const marker = new google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        map,
        title: 'Tamiyoz Map',
        icon: image,
      });
      // map.addListener('resize', () => {
      //   map.setZoom(8);
      // });
    });
  }
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

  ngOnInit(): void {
    this.getOneProject();
    // this.getOneProject();
    // this.addRente();

    this.title2Link = `/project-page/` + this.idlink;

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

    this.stationsService.getOneProject(this.idlink, 'stations').subscribe(
      (res: any) => {
        this.responseData = res.data;

        let arrImgs = this.responseData.images;
        console.log('ALL IMAGES FOR STATION', arrImgs);

        this.lat = parseFloat(this.responseData.lat);
        this.lng = parseFloat(this.responseData.lon);
        this.map_url =
          'https://maps.google.com/maps?q=' +
          this.lat +
          ',' +
          this.lng +
          '&hl=es&z=14&amp&output=embed';
        // console.log(this.lat);

        // this.map_url = this.sanitizer.bypassSecurityTrustResourceUrl(
        //   `https://maps.google.com/maps?q=${this.lat},${this.lng}&hl=es&z=14&amp&output=embed`
        // );
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

    this.shopsService.getSomeShops(this.idlink).subscribe((res: any) => {
      this.responseDataShops = res.data;

      this.googleCustomMap();
      // console.log('this is a map');

      // console.log(this.responseDataShops);
    });
  }
  addRente() {
    this.stationsService
      .addRente(
        this.formValue.value.name,
        this.formValue.value.phone,
        this.formValue.value.email,
        this.formValue.value.comment,
        this.formValue.value.duration,
        this.propertyId,
        this.formValue.value.activityType,
        // this.formValue.value.propertyname,
        this.formValue.value.registration_no
      )
      .subscribe(
        (res: any) => {
          this.responseDataAddRente = res.data;
          console.log(this.responseDataAddRente);
          if (this.responseDataAddRente.id) {
            setTimeout(() => {
              this.stationsService
                .sendMail(
                  this.responseDataAddRente.id,
                  this.formValue.value.name
                )
                .subscribe(
                  (res: any) => {
                    console.log('RESPONSE FROM SEND MAIL is', res);
                  },
                  (err: any) => {
                    Swal.fire({
                      icon: 'error',
                      title:
                        this.direction == 'ltr'
                          ? 'Something Went Wrong, Try Again Later.'
                          : 'حدث خطأ ما, أعد المحاولة لاحقاً',
                      confirmButtonText: this.direction == 'ltr' ? 'Ok' : 'تم',
                      confirmButtonColor: '#F17474',
                      iconColor: '#F17474',
                    });
                  }
                );
            }, 5000);
          }
        },
        (err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title:
              this.direction == 'ltr'
                ? 'Something Went Wrong, Try Again Later.'
                : 'حدث خطأ ما, أعد المحاولة لاحقاً',
            confirmButtonText: this.direction == 'ltr' ? 'Ok' : 'تم',
            confirmButtonColor: '#F17474',
            iconColor: '#F17474',
          });
        }
      );
  }
}
