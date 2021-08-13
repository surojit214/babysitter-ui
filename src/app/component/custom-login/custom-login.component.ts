import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.css']
})
export class CustomLoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
