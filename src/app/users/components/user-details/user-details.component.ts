import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [SpinnerComponent, CommonModule ,FontAwesomeModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(500)
      ])
    ])
  ]
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
    this.route.params.subscribe(params => {
      this.id = params['id'];
    this.getUserDetails();
    });
  }

  getUserDetails() {
    this.Loading = true;
    this.usersService.getUserById(this.id).subscribe(
      (user: any) => {
        this.Loading = false;
        this.data = user;
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
