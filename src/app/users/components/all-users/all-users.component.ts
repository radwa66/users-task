import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RouterModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(500)]),
    ]),

    trigger('rowSelected', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
          backgroundColor: 'white',
        })
      ),
      state(
        'selected',
        style({
          transform: 'scale(1.02)',
          backgroundColor: '#eef1f9',
        })
      ),
      transition('normal <=> selected', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  Loading: boolean = false;
  selectedUserId: any = null;
  constructor(private service: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.Loading = true;
    this.service.getAllUsers().subscribe(
      (res: any) => {
        this.users = res;
        this.Loading = false;
      },
      (error) => {
        alert('Error');
      }
    );
  }

  viewDetails(userId: any) {
    this.router.navigate(['/details', userId]);
  }

  searchById(searchTerm: string) {
    if (searchTerm) {
      this.filteredUsers = this.users.filter((user) =>
        user.id.toString().includes(searchTerm)
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  isSelected(userId: any): boolean {
    return this.selectedUserId === userId;
  }
}
