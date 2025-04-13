import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depot } from '../models/depot.model';
import { AbstractTechnology } from '../models/technology.model';
import { Dependency } from '../models/dependency.model';
import { ApiService } from './api.service'; // Import ApiService

@Injectable({
  providedIn: 'root',
})
export class DepotService {
  private depotsPath = '/depots'; // Define path segment

  // Inject ApiService instead of HttpClient
  constructor(private apiService: ApiService) {}

  getDepots(): Observable<Depot[]> {
    return this.apiService.get<Depot[]>(this.depotsPath);
  }

  getDepot(id: number): Observable<Depot> {
    return this.apiService.get<Depot>(`${this.depotsPath}/${id}`);
  }

  createDepot(depot: Omit<Depot, 'id' | 'branch'>): Observable<Depot> {
    return this.apiService.post<Depot>(`${this.depotsPath}/create`, depot);
  }

  deleteDepot(id: number): Observable<string> {
    // Still uses GET for now based on backend
    // TODO: Ideally, backend should use DELETE verb. If changed, update to use apiService.delete
    return this.apiService.get<string>(`${this.depotsPath}/${id}/delete`);
  }

  updateDepot(id: number, depot: Partial<Depot>): Observable<Depot> {
    // Use Partial<Depot> if you only send fields to update
    return this.apiService.post<Depot>(
      `${this.depotsPath}/${id}/update`,
      depot
    );
  }

  cloneDepot(id: number): Observable<string> {
    return this.apiService.get<string>(`${this.depotsPath}/${id}/clone`);
  }

  pullDepot(id: number): Observable<string> {
    return this.apiService.get<string>(`${this.depotsPath}/${id}/pull`);
  }

  getDepotCode(id: number): Observable<File[]> {
    // Still returns File[], handling might be needed
    return this.apiService.get<File[]>(`${this.depotsPath}/${id}/code`);
  }

  deleteDepotCode(id: number): Observable<string> {
    return this.apiService.get<string>(`${this.depotsPath}/${id}/code/delete`);
  }

  getDepotTechnologies(id: number): Observable<AbstractTechnology[]> {
    return this.apiService.get<AbstractTechnology[]>(
      `${this.depotsPath}/${id}/technologies`
    );
  }

  getDepotDependencies(id: number): Observable<Map<string, Dependency[]>> {
    return this.apiService.get<Map<string, Dependency[]>>(
      `${this.depotsPath}/${id}/dependencies`
    );
  }

  updateDepotDependencies(id: number): Observable<string> {
    return this.apiService.get<string>(
      `${this.depotsPath}/${id}/dependencies/update`
    );
  }

  createPullRequest(id: number): Observable<string> {
    return this.apiService.get<string>(`${this.depotsPath}/${id}/pullRequest`);
  }
}
