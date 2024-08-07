import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [SpinnerComponent, CommonModule ,FontAwesomeModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit  {
  data: any = {};
  Loading: boolean = false;
  id: any;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private library: FaIconLibrary
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.library.addIcons(faArrowLeft);
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.Loading = true;
    this.usersService.getUserById(this.id).subscribe(
      (user: any) => {
        this.Loading = false;
        this.data = user.data;
      },
      (error) => {
        this.Loading = false;
        alert(error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/']);  
  }
}
