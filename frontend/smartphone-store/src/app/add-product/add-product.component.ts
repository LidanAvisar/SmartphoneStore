import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  product = {
    company: '',
    model: '',
    screenSize: '',
    storageCapacity: '',
    color: ''
  };

  constructor(private apiService: ApiService) { }

  onSubmit() {
    this.apiService.addProduct(this.product).subscribe((response: any) => {
      console.log('Product added', response);
      this.resetForm();
    });
  }

  resetForm() {
    this.product = {
      company: '',
      model: '',
      screenSize: '',
      storageCapacity: '',
      color: ''
    };
  }
}