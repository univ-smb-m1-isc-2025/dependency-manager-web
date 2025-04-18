import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DepotService } from '../../services/depot/depot.service';
import { Observable, of } from 'rxjs';
import { Depot } from '../../models/depot.model';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-depot-detail',
  templateUrl: './depot-detail.component.html',
  styleUrls: ['./depot-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DepotDetailComponent implements OnInit {
  depot$: Observable<Depot | null> = new Observable<Depot | null>();
  depotId: number;
  technologies: any[] = [];
  dependencies: any[] = [];
  isLoadingTechnologies: boolean = true;
  isLoadingDependencies: boolean = true;

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
    this.loadDependencies();
    this.loadTechnologies();
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

  loadDependencies(): void {
    this.isLoadingDependencies = true;
    this.depotService.getDepotDependencies(this.depotId).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.dependencies = response.data.Java || [];
        }
        this.isLoadingDependencies = false;
      },
      error: (error) => {
        console.error('Error getting depot dependencies:', error);
        this.isLoadingDependencies = false;
      },
    });
  }

  loadTechnologies(): void {
    this.isLoadingTechnologies = true;
    this.depotService.getDepotTechnologies(this.depotId).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.technologies = response.data || [];
        }
        this.isLoadingTechnologies = false;
      },
      error: (error) => {
        console.error('Error getting depot technologies:', error);
        this.isLoadingTechnologies = false;
      },
    });
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
    this.router.navigate(['/depots']);
  }
}
