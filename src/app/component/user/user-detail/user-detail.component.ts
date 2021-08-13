import { Component, OnInit } from '@angular/core';
import {UserDetailService} from '../../../service/user-detail.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../entity/user/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public user: User;
  public subjectUser: Subject<User> = new Subject();
  public userFormGroup: FormGroup;
  public active = 1;

  constructor(private userDetailService: UserDetailService, private formBuilder: FormBuilder, private router: ActivatedRoute,
              private route: Router) { }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      USER: this.formBuilder.group({
        name: [''],
        email: [''],
        gender: [''],
        phoneNo: [''],
        userType: ['']
      })
    });
    this.subjectUser.subscribe(value => {
      this.initForm(value);
    });
    this.router.paramMap.subscribe(value => {
      this.populateUserDetail();
    });
  }

  public populateUserDetail(): void {
    const id = +this.router.snapshot.paramMap.get('id');
    this.userDetailService.getUserDetails(id).subscribe(
      value => {
        this.user = value;
        this.subjectUser.next(value);
        // this.initForm();
      }
    );
  }

  private initForm(user: User): void {
    this.userFormGroup.get('USER.name').setValue(user.name);
    this.userFormGroup.get('USER.email').setValue(user.email);
    this.userFormGroup.get('USER.gender').setValue(user.gender);
    this.userFormGroup.get('USER.phoneNo').setValue(user.phoneNo);
    this.userFormGroup.get('USER.userType').setValue(user.userType);
  }

  public onSave(): void {
    console.log(this.userFormGroup.get('USER').value);
    this.user.name = this.userFormGroup.controls.USER.get('name').value;
    this.user.email = this.userFormGroup.controls.USER.get('email').value;
    this.user.userType = this.userFormGroup.controls.USER.get('userType').value;
    this.user.phoneNo = this.userFormGroup.controls.USER.get('phoneNo').value;
    this.user.gender = this.userFormGroup.controls.USER.get('gender').value;
    console.log(this.user);
    this.userDetailService.updateUser(this.user).subscribe(value => {
      this.user = value;
      this.route.navigateByUrl('/users');
    });
  }
}
