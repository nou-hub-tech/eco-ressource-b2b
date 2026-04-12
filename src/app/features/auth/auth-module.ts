import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [Login, Register],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)]
})
export class AuthModule {}