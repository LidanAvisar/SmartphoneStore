import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  @ViewChild('addProductForm') addProductForm!: NgForm;

  product = {
    company: '',
    model: '',
    screenSize: '',
    storageCapacity: '',
    color: ''
  };

  successMessage: string | null = null;

  constructor(private apiService: ApiService) { }

  onSubmit() {
    if (this.addProductForm.valid) {
      this.apiService.addProduct(this.product).subscribe(
        (response: any) => {
          console.log('Product added', response);
          this.successMessage = 'The product has been added successfully.';
          this.resetForm();
        },
        (error) => {
          console.error('Error adding product', error);
        }
      );
    }
  }

  resetForm() {
    this.product = {
      company: '',
      model: '',
      screenSize: '',
      storageCapacity: '',
      color: ''
    };
    this.addProductForm.resetForm();
  }
}
