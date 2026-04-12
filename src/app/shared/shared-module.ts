import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QrModalComponent } from './components/qr-modal/qr-modal.component';

@NgModule({
  declarations: [Sidebar, Header, Layout],
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
    NavbarComponent,
    QrModalComponent
  ]
})
export class SharedModule {}