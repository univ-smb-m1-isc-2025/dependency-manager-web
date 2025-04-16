import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dependency } from '../../models/dependency.model';
import { AbstractTechnology } from '../../models/technology.model';
import { ApiService } from '../api/api.service';
import { Depot } from '../../models/depot.model';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class DepotService {
  private depotsPath = '/depots'; // Define path segment
  private accountsPath = '/accounts';

  constructor(private apiService: ApiService) {}

  getDepots(): Observable<ApiResponse> {
    return this.apiService.get(this.accountsPath + '/me/depots');
  }

  getDepot(id: number): Observable<ApiResponse> {
    return this.apiService.get(`${this.depotsPath}/${id}`);
  }

  createDepot(depot: Omit<Depot, 'id' | 'branch'>): Observable<ApiResponse> {
    return this.apiService.post(`${this.depotsPath}/create`, depot);
  }

  deleteDepot(id: number): Observable<ApiResponse> {
    // Still uses GET for now based on backend
    // TODO: Ideally, backend should use DELETE verb. If changed, update to use apiService.delete
    return this.apiService.delete(`${this.depotsPath}/${id}/delete`);
  }

  updateDepot(id: number, depot: Partial<Depot>): Observable<ApiResponse> {
    // Use Partial<Depot> if you only send fields to update
    return this.apiService.post(`${this.depotsPath}/${id}/update`, depot);
  }

  cloneDepot(id: number): Observable<ApiResponse> {
    return this.apiService.get(`${this.depotsPath}/${id}/clone`);
  }

  pullDepot(id: number): Observable<ApiResponse> {
    return this.apiService.get(`${this.depotsPath}/${id}/pull`);
  }

  getDepotCode(id: number): Observable<ApiResponse> {
    // Still returns File[], handling might be needed
    return this.apiService.get(`${this.depotsPath}/${id}/code`);
  }

  deleteDepotCode(id: number): Observable<ApiResponse> {
    return this.apiService.get(`${this.depotsPath}/${id}/code/delete`);
  }

  getDepotTechnologies(id: number): Observable<ApiResponse> {
    return this.apiService.get(`${this.depotsPath}/${id}/technologies`);
  }

  getDepotDependencies(id: number): Observable<ApiResponse> {
    return this.apiService.get(`${this.depotsPath}/${id}/dependencies`);
  }

  updateDepotDependencies(id: number): Observable<ApiResponse> {
    return this.apiService.get(`${this.depotsPath}/${id}/dependencies/update`);
  }

  createPullRequest(id: number): Observable<ApiResponse> {
    return this.apiService.get(`${this.depotsPath}/${id}/pullRequest`);
  }
}
