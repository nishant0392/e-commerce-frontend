import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/apiResponse.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  private baseUrl = isDevMode() ? 'http://localhost:3000/api/v2' : 'http://api.nkart.nishant-kumar.com/api/v2';
  
  constructor(private http: HttpClient) { }

  public getItems(listId: string) {   
    return this.http.get<ApiResponse>(`${this.baseUrl}/category/product/all?listId=${listId}`);
  }

  public getSingleItem(listId: string, productId: string) {   
    return this.http.get<ApiResponse>(`${this.baseUrl}/category/product?listId=${listId}&pid=${productId}`);
  }
}
