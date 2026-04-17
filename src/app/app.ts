import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('eco-ressource-b2b');
  
  toggleSidebar() {
    // Your sidebar toggle logic
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('collapsed');
  }
  
  toggleTheme() {
    // Your theme toggle logic
    document.body.classList.toggle('dark-mode');
  }
  
  toggleNotifications() {
    // Your notifications logic
    console.log('Notifications clicked');
  }
}