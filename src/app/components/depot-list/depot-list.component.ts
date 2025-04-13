import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Depot } from '../../models/depot.model';
import { DepotService } from '../../services/depot/depot.service';
import { Observable } from 'rxjs';
import { map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-depot-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './depot-list.component.html',
})
export class DepotListComponent implements OnInit {
  depots$: Observable<Depot[]> = new Observable<Depot[]>();
  error: string | null = null;

  constructor(private depotService: DepotService) {}

  ngOnInit(): void {
    this.loadDepots();
  }

  loadDepots(): void {
    this.depots$ = this.depotService.getDepots().pipe(
      map((response) => {
        if (response.status === 'success') {
          return response.data;
        }
        this.error =
          'Failed to load depots. Please check the backend connection.';
        return [];
      }),
      catchError((err) => {
        console.error('Error loading depots:', err);
        this.error =
          'Failed to load depots. Please check the backend connection.';
        return of([]);
      })
    );
  }

  // TODO: Add methods for delete, update, clone, etc. later
}
