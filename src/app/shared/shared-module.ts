import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';

@NgModule({
  declarations: [Sidebar, Header, Layout],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [Sidebar, Header, Layout, FormsModule]
})
export class SharedModule {}