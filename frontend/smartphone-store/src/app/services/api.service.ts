import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5044/api/products';
  private authUrl = 'http://localhost:5044/api/auth';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { username, password });
  }

  getProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  addProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const headers = this.getHeaders();
    console.log('Sending update request for product:', product);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers });
  }

  deleteProduct(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getUserDetails(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.authUrl}/user`, { headers });
  }
}
