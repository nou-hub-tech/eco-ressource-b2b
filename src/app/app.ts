import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('eco-ressource-b2b');

  toggleSidebar(): void {
    document.querySelector('.sidebar')?.classList.toggle('collapsed');
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-mode');
  }

  toggleNotifications(): void {
    console.log('Notifications clicked');
  }
}
