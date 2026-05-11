import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CURRENT_ENTERPRISE_NAME } from '../../reservation-workspace.models';
import { ReservationWorkspaceService } from '../../services/reservation-workspace.service';

@Component({
  selector: 'app-workspace-shell',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './workspace-shell.component.html',
  styleUrl: './workspace-shell.component.scss'
})
export class WorkspaceShellComponent {
  private readonly workspaceService = inject(ReservationWorkspaceService);
  readonly enterpriseName = CURRENT_ENTERPRISE_NAME;

  readonly summary$ = this.workspaceService.summary$;
}
