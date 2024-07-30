import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  filterText: string = '';
  filterCategory: string = 'all';
  user: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.apiService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = data; 
    });
  }

  applyFilter(): void {
    if (!this.filterText) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter(product => {
      if (this.filterCategory === 'all') {
        return Object.values(product).some(value => 
          (value as string | number | boolean | null | undefined)?.toString().toLowerCase().includes(this.filterText.toLowerCase())
        );
      } else {
        return (product[this.filterCategory] as string | number | boolean | null | undefined)?.toString().toLowerCase().includes(this.filterText.toLowerCase());
      }
    });
  }
}
