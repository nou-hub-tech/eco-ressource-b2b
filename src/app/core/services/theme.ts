import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.loadDark());
  isDark$ = this.darkMode.asObservable();

  get isDark(): boolean { return this.darkMode.value; }

  private loadDark(): boolean {
    return localStorage.getItem('eco_dark') === 'true';
  }

  toggle(): void {
    const next = !this.darkMode.value;
    this.darkMode.next(next);
    localStorage.setItem('eco_dark', String(next));
    this.apply(next);
  }

  apply(dark: boolean): void {
    document.body.classList.toggle('dark-mode', dark);
  }

  init(): void {
    this.apply(this.isDark);
  }
}