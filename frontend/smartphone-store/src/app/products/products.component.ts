import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  successMessage: string | null = null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filterText: string = '';
  filterCategory: string = 'all';
  user: any;
  editingProduct: Product | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.apiService.getProducts().subscribe((data: Product[]) => {
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
        return (product[this.filterCategory as keyof Product] as string | number | boolean | null | undefined)?.toString().toLowerCase().includes(this.filterText.toLowerCase());
      }
    });
  }

  startEdit(product: Product): void {
    this.editingProduct = { ...product };
  }

  saveEdit(): void {
    if (this.editingProduct) {
      console.log('Saving edited product:', this.editingProduct);
      this.apiService.updateProduct(this.editingProduct.id!, this.editingProduct).subscribe(
        (updatedProduct) => {
          console.log('Update response:', updatedProduct);
          if (!updatedProduct) {
            console.error('Updated product is null or undefined');
            return;
          }

          // Ensure the updated product is reflected in both products and filteredProducts
          this.updateProductLists(updatedProduct);

          // Reset the editingProduct object
          this.editingProduct = null;
          this.successMessage = 'The product has been updated successfully.';
        },
        (error) => {
          console.error('Failed to update product', error);
        }
      );
    }
  }

  onEditFieldChange(field: keyof Product, value: any, product: Product): void {
    if (this.editingProduct && this.editingProduct.id === product.id) {
      (this.editingProduct[field] as any) = value;
    }
  }

  updateProductLists(updatedProduct: Product): void {
    console.log('Updating product lists with:', updatedProduct);
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    } else {
      console.error('Product not found in the product list');
    }

    const filteredIndex = this.filteredProducts.findIndex(p => p.id === updatedProduct.id);
    if (filteredIndex !== -1) {
      this.filteredProducts[filteredIndex] = updatedProduct;
    }

    // Reapply filter to ensure the updated product is displayed
    this.applyFilter();

    // Trigger change detection
    this.cd.detectChanges();
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  deleteProduct(productId: number): void {
    this.apiService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== productId);
        this.applyFilter();
      },
      (error) => {
        console.error('Failed to delete product', error);
      }
    );
  }
}
