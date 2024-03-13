import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
    
@Injectable()
export class SuppliersService {
    constructor(
        private http: HttpClient,
    ){}
    getSuppliers(){
        return this.http.get('http://localhost:3000/supplier')
    }
    createNewSupplier(parameters:any){
        return this.http.post('http://localhost:3000/supplier', parameters)
    }

    deleteSupplier(idSupplier:string){
        return this.http.delete(`http://localhost:3000/supplier/${idSupplier}`)
    }

    getSupplierById(idSupplier:string){
        return this.http.get(`http://localhost:3000/supplier/${idSupplier}`)
    }

    saveSupplierUpdating(idSupplier:string, parameters:any){
        return this.http.put(`http://localhost:3000/supplier/${idSupplier}`,parameters)
    }
};