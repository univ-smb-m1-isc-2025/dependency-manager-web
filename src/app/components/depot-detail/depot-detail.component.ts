import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DepotService } from '../../services/depot/depot.service';
import { Observable } from 'rxjs';
import { Depot } from '../../models/depot.model';
import { map, catchError, of } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depot-detail',
  templateUrl: './depot-detail.component.html',
  styleUrl: './depot-detail.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DepotDetailComponent implements OnInit {
  depot$: Observable<Depot | null> = new Observable<Depot | null>();
  depotId: number;

  constructor(
    private depotService: DepotService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.depotId = this.route.snapshot.params['id'] as number;
    console.log(this.depotId);
  }

  ngOnInit(): void {
    this.loadDepot();
  }

  loadDepot(): void {
    this.depot$ = this.depotService.getDepot(this.depotId).pipe(
      map((response) => {
        if (response.status === 'success') {
          return response.data;
        }
        console.error('Failed to load depot:', response.message);
        return [];
      }),
      catchError((err) => {
        console.error('Error loading depot:', err);
        return of(null);
      })
    );
  }

  onClick(): void {
    console.log('Depot id:', this.depotId);
    this.apiService
      .put(`/depots/${this.depotId}/dependencies/update`, {})
      .subscribe();
  }

  deleteRepo(): void {
    this.depotService.deleteDepot(this.depotId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          console.log('Dépôt supprimé avec succès');
          this.router.navigate(['/depots']);
        } else {
          console.error('Erreur de suppression:', res.message);
        }
      },
      error: (err) => {
        console.error('Erreur HTTP :', err);
      },
    });
  }

  returnToList(): void {
    this.router.navigate(['/depots'])
  }
}
