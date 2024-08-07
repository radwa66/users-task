import { Routes } from '@angular/router';
import { AllUsersComponent } from './users/components/all-users/all-users.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';

export const routes: Routes = [
  {path:"users" , component:AllUsersComponent},
  {path:"details", component:UserDetailsComponent},
  {path: "**", redirectTo:"users" , pathMatch: "full"}
];
