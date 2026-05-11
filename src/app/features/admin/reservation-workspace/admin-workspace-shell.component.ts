import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReservationWorkspaceService } from '../../../shared/reservation-workspace/services/reservation-workspace.service';

@Component({
  selector: 'app-admin-workspace-shell',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './admin-workspace-shell.component.html',
  styleUrl: './admin-workspace-shell.component.scss'
})
export class AdminWorkspaceShellComponent {
  private readonly workspaceService = inject(ReservationWorkspaceService);

  readonly summary$ = this.workspaceService.summary$;
}
