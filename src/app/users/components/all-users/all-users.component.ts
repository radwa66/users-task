import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RouterModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  Loading: boolean = false;
  constructor(private service: UsersService , private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.Loading = true;
    this.service.getAllUsers().subscribe(
      (res: any) => {
        this.users = res.data;
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


 
}
