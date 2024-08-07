import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, HeaderComponent, RouterModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
