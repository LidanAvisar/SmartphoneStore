
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5044/api/products';
  private authUrl = 'http://localhost:5044/api/auth';

  constructor(private http: HttpClient) {}


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { username, password });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }


  addProduct(product: Product): Observable<Product> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }
}