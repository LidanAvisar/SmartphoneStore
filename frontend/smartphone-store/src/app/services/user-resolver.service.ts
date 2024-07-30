import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(): Observable<any> {
    return this.apiService.getUserDetails();
  }
}
