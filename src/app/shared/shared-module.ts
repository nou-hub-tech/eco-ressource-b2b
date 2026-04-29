import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { DatepickerDirective } from './directives/datepicker.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QrModalComponent } from './components/qr-modal/qr-modal.component';

@NgModule({
  declarations: [Sidebar, Header, Layout, LanguageSwitcherComponent, DatepickerDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    QrModalComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Sidebar,
    Header,
    Layout,
    LanguageSwitcherComponent,
    DatepickerDirective,
    NavbarComponent,
    QrModalComponent
  ]
})
export class SharedModule {}
