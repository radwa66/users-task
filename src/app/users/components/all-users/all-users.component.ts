import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = true; 
  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.service.getAllUsers().subscribe((res: any) => {
      this.users = res.data;
      this.isLoading = false; 
    });
  }
}
