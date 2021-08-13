import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user-service';
import {User} from '../../../entity/user/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.createUser(new User()).subscribe();
  }

}
