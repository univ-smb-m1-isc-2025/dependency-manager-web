import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Depot } from '../../models/depot.model';
import { DepotService } from '../../services/depot/depot.service';
import { Observable } from 'rxjs';
import { map, catchError, of } from 'rxjs';
import { DepotPreviewComponent } from '../depot-preview/depot-preview.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-depot-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DepotPreviewComponent,
    SearchbarComponent,
  ],
  templateUrl: './depot-list.component.html',
  styleUrls: ['./depot-list.component.css'],
})
export class DepotListComponent implements OnInit {
  depots$: Observable<Depot[]> = new Observable<Depot[]>();
  error: string | null = null;

  constructor(private depotService: DepotService, private router: Router) {}

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

  onClickDepot(depot: Depot): void {
    this.router.navigate(['/depots', depot.id]);
  }

  onSearch(searchTerm: string): void {
    // Filter the depots based on the search term
    this.depots$ = this.depotService.getDepots().pipe(
      map((response) => {
        return response.data.filter(
          (depot: Depot) =>
            depot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            depot.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
            depot.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }
}
