import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Depot } from '../../models/depot.model';
import { ApiService } from '../../services/api/api.service';


@Component({
  selector: 'app-depot-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './depot-preview.component.html',
  styleUrls: ['./depot-preview.component.css'],
})
export class DepotPreviewComponent {
  @Input() depot: Depot | null = null;

  constructor(private apiService: ApiService) {}

}
