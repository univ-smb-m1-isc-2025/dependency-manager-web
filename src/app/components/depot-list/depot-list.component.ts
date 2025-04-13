import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Depot } from '../../models/depot.model'; // Adjust path as needed
import { DepotService } from '../../services/depot.service'; // Adjust path as needed
import { Observable } from 'rxjs';

@Component({
  selector: 'app-depot-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './depot-list.component.html',
})
export class DepotListComponent implements OnInit {
  depots$: Observable<Depot[]> | undefined;
  error: string | null = null;

  constructor(private depotService: DepotService) {}

  ngOnInit(): void {
    this.loadDepots();
  }

  loadDepots(): void {
    this.depots$ = this.depotService.getDepots();
    // Basic error handling example:
    this.depots$.subscribe({
      error: (err) => {
        console.error('Error loading depots:', err);
        this.error =
          'Failed to load depots. Please check the backend connection.';
      },
    });
  }

  // TODO: Add methods for delete, update, clone, etc. later
}
