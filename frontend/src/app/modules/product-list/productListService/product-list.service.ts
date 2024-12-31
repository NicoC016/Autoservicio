import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductListService {
    constructor(
        public http:HttpClient,
    ){}
    getAllProduct():Observable<any>{
        return this.http.get('http://localhost:3000/product');
    }
    createProduct(parameters:any):Observable<any>{
        return this.http.post('http://localhost:3000/product',parameters)
    }
    deleteProduct(productId:string):Observable<any>{
     return this.http.delete(`http://localhost:3000/product/${productId}`)   
    }
    getProductById(productId:string):Observable<any>{
        return this.http.get(`http://localhost:3000/product/${productId}`)
    }
    PutProduct(productId:string, parameters:any):Observable<any>{
        return this.http.put(`http://localhost:3000/product/${productId}`,parameters)
    }
}