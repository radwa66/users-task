import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, HeaderComponent, SpinnerComponent, RouterModule],
  exports: [HeaderComponent, SpinnerComponent],
})
export class SharedModule {}
