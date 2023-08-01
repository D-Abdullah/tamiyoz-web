import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { ShopsService } from 'src/app/services/shops.service';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
  Validators,
} from '@angular/forms';
import { StationsService } from 'src/app/services/stations.service';

// Sweet Alert
import Swal from 'sweetalert2';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  responseData: any = {};
  // FORM VARIABLES
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
  propertyId: any;
  propertyName: any;

  idlink: any;

  imageShopUrl = this.shopsService.shopImageUrl;
  fileUrl = this.stationsService.shopsFileUrl;

  closeResult = '';
  direction = this.commonService.getDirection();

  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'Projects' : 'المشاريع';
  title1Link: string = '/projects';
  title2: any;
  title2Link: any;
  title3: any;
  title3Link: any;

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private shopsService: ShopsService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private stationsService: StationsService
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

  ngOnInit(): void {
    this.getOneShop();

    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      propertyname: [this.propertyName, [Validators.required]],
      duration: ['', [Validators.required]],
      email: ['', [Validators.email]],
      comment: [''],
      // comment: ['', [Validators.minLength(10), Validators.required]],
      // imagename: ['postData.push(res)'],
    });

    // this.getOneShop();

    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
  }

  getOneShop() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.idlink = params.get('id');
    });

    this.shopsService.getOneShop(this.idlink).subscribe(
      (res: any) => {
        this.responseData = res.data;
        this.propertyId = this.responseData.id;
        this.propertyName = this.responseData.name;
        console.log('HELLOOOOO', this.responseData);
        // console.log(this.propertyName);

        // console.log(this.responseData);

        this.title2 = this.responseData.station_name;
        this.commonService.insertSubTitleHeader(`> ` + this.title2);

        this.title2Link = `/project-page/` + this.responseData.station_id;
        this.commonService.insertSubTitleHeaderLink(this.title2Link);

        this.title3 = this.responseData.name;
        this.commonService.insertAfterSubTitleHeader(`> ` + this.title3);
        this.title3Link = `/shop/` + this.idlink;
        this.commonService.insertAfterSubTitleHeaderLink(this.title3Link);
        this.commonService.insertTitleHeaderMain(this.title3);

        this.commonService.setTitle(this.title3);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
