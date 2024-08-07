import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../users/services/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    this.service.getAllUsers().subscribe((res: any) => {
      this.searchResults = res.data;
    });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.searchEvent.emit(this.searchTerm);
    if (this.searchTerm) {
      this.searchResults = this.searchResults.filter(user => user.id.toString().includes(this.searchTerm));
    } else {
      this.searchResults = [];
    }
  }

  onFocus() {
    this.showDropdown = true;
  }

  onBlur() {
    // Use a timeout to handle the click outside scenario
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // Adjust timeout as needed
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchResults = [];
    this.showDropdown = false;
  }
}
