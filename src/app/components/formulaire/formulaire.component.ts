import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Depot } from '../../models/depot.model';
import { DepotService } from '../../services/depot/depot.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { DepotPreviewComponent } from '../depot-preview/depot-preview.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'formulaire-add',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DepotPreviewComponent,
    SearchbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class formulaireCompoment {
  depots$: Observable<Depot[]> = new Observable<Depot[]>();
  error: string | null = null;
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private depotService: DepotService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      username: ['', Validators.required],
      token: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {

      let id = this.authService.currentUserValue!.id;

      let depot: Depot = {
        name: this.form.value.name,
        url: this.form.value.url,
        username: this.form.value.username,
        token: this.form.value.token,
        accountId: id,
        branch: null,
        gitIconUrl: null,
        lastDependenciesUpdate: null,
      };
      
      this.depotService.createDepot(depot).subscribe({
        next: (depot) => {
          console.log('Depot created successfully:', depot);
          window.location.href = '/depots';
        },
        error: (error) => {
          console.error('Error creating depot:', error);
        },
      })
    }
  }

  deployFormulaire(): void {}
}
