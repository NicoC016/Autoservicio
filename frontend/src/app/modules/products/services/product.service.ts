import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
    
@Injectable()
export class ProductService {
    constructor(
        private http:HttpClient,
    ){}

    addProduct(data:any):Observable<any>{
        return this.http.post('http://localhost:3000/productList', data)
    }
    getProduct():Observable<any>{
        return this.http.get('http://localhost:3000/productList');
    }
    getAllProduct():Observable<any>{
        return this.http.get('http://localhost:3000/product');
    }
    searchProduct(codebar:any):Observable<any>{
        return this.http.get(`http://localhost:3000/product/${codebar}`)
    }
    
    deleteProduct(codebar:any):Observable<any>{
        return this.http.delete<number>(`http://localhost:3000/productList/${codebar}`)
    }   
};
