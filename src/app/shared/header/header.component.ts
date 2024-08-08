import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersService } from '../../users/services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchResults: any[] = [];
  searchTerm: string = '';
  showDropdown: boolean = false;

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.service.getAllUsers().subscribe((users: any[]) => {
      this.searchResults = users;
    });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    if (this.searchTerm) {
      this.searchResults = this.searchResults.filter(user => user.id.toString().includes(this.searchTerm));
    } else {
      this.getUsers(); 
    }

    this.showDropdown = true;
  }

  onFocus() {
    this.showDropdown = true;
  }

  onBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); 
  }

  clearSearch() {
    this.searchTerm = '';
    this.getUsers(); 
    this.showDropdown = false;
  }
}
