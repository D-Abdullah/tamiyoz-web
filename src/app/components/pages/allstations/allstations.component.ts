import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { ShopsService } from 'src/app/services/shops.service';
import { StationsService } from 'src/app/services/stations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allstations',
  templateUrl: './allstations.component.html',
  styleUrls: ['./allstations.component.scss'],
})
export class AllstationsComponent implements OnInit {
  showAvailableShopsLayout: boolean = false;

  formValue!: FormGroup;
  modalNameIsValid: any;
  modalPhoneIsValid: any;
  modalDurationIsValid: any;
  modalPropertyNameIsValid: any;
  modalEmailIsValid: any;
  modalTermsIsValid: any;
  modalActivityTypeIsValid: any;
  modalRegistrationNoIsValid: any;

  responseDataAddRente: any = {};
  // responseData1: any = {};
  responseDataShops: any[] = [];
  // responseOneData: any[] = [];
  responseData: any[] = [];

  imageUrl = this.stationsService.stationImageUrl;

  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'Projects' : 'المشاريع';
  title1Link: string = '/projects';
  allStationsWithAvailableShops: any[] = [];
  allStationsWithAvailableShopsTitles: any[] = [];
  direction = this.commonService.getDirection();
  selectedAvailableStations: any[] = [];

  // MODAL CLOSE
  closeResult = '';
  propertyName: any;
  propertyId: any;

  constructor(
    public commonService: CommonService,
    private stationsService: StationsService,
    public shopsService: ShopsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getstationWithAllRentedShop();

    this.commonService.insertTitleHeaderMain(this.title1);
    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
    this.commonService.insertSubTitleHeader('');
    this.commonService.insertAfterSubTitleHeader('');
    this.getSomeProjects();

    this.commonService.setTitle(this.title1);

    this.commonService.addMetaTag('title', 'all stationssss');
  }

  checkAvailableStations(event: any, station: any) {
    if (event.currentTarget.checked) {
      this.selectedAvailableStations.push(station);
    } else {
      this.selectedAvailableStations.forEach((element, index) => {
        if (element == station) this.selectedAvailableStations.splice(index, 1);
      });
    }
    console.log('checkAvailableStations', this.selectedAvailableStations);
    this.allStationsWithAvailableShops = this.selectedAvailableStations;
    if (this.selectedAvailableStations.length == 0) {
      this.allStationsWithAvailableShops = this.allStationsWithAvailableShopsTitles;
    }
    
  }

  toggleAvailableShopsLayout() {
    this.showAvailableShopsLayout = !this.showAvailableShopsLayout;
    console.log('toggle available shops ', this.showAvailableShopsLayout);
  }

  getstationWithAllRentedShop() {
    this.stationsService.getstationWithAllRentedShop().subscribe((data) => {
      console.log('all available stations with shops ', data.data);

      var resultArray = Object.keys(data.data).map((personNamedIndex) => {
        let station = data.data[personNamedIndex];
        // do something with person

        this.allStationsWithAvailableShops.push(station);
      });
      console.log('TEST OBJECT ', this.allStationsWithAvailableShops);
      this.allStationsWithAvailableShopsTitles = this.allStationsWithAvailableShops;
    });
  }

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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  getSomeProjects() {
    this.stationsService.getSomeProjects('stations').subscribe(
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
