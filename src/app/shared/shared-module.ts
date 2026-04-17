import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

@NgModule({
  declarations: [Sidebar, Header, LanguageSwitcherComponent, Layout],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [Sidebar, Header, Layout, FormsModule, LanguageSwitcherComponent] // Add LanguageSwitcherComponent here
})
export class SharedModule {}