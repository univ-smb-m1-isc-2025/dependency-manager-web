import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DepotService } from '../../services/depot/depot.service';
import { Observable } from 'rxjs';
import { Depot } from '../../models/depot.model';
import { map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-depot-detail',
  templateUrl: './depot-detail.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DepotDetailComponent implements OnInit {
  depot$: Observable<Depot | null> = new Observable<Depot | null>();
  depotId: number;

  constructor(
    private depotService: DepotService,
    private route: ActivatedRoute
  ) {
    this.depotId = this.route.snapshot.params['id'] as number;
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
        return [];
      }),
      catchError((err) => {
        console.error('Error loading depot:', err);
        return of(null);
      })
    );
  }
}
