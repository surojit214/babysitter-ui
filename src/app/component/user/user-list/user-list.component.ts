import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../service/user-service';
import {User} from '../../../entity/user/user';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  sub: Subscription[];

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(() => {
       this.getUsers();
     } );
  }

  public getUsers(): void {
    const currentUserType: string = this.route.snapshot.paramMap.get('usertype');

    if (currentUserType) {
      this.userService.getUserByType(currentUserType).subscribe(value => {
        this.users = value;
      });
    } else {
      this.userService.allUsers.subscribe(value => {
        this.users = value;
      });
    }
  }

  ngOnDestroy(): void {
    // this.sub.forEach(value => value.unsubscribe());
    this.users = null;
  }
}
