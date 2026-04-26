import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
<<<<<<< HEAD

@NgModule({
  declarations: [Sidebar, Header, Layout],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [Sidebar, Header, Layout, CommonModule, FormsModule, RouterModule]
})
export class SharedModule {}
=======
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { DatepickerDirective } from './directives/datepicker.directive';

@NgModule({
  declarations: [Sidebar, Header, LanguageSwitcherComponent, Layout, DatepickerDirective],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [Sidebar, Header, Layout, FormsModule, LanguageSwitcherComponent, DatepickerDirective]
})
export class SharedModule {}
>>>>>>> origin/integration/gestion-annonce-et-product-v2
