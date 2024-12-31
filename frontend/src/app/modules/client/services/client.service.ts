import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
    
@Injectable()
export class ClienteService {
    constructor(
        private http: HttpClient,
    ){}
    getClient(){
        return this.http.get('http://localhost:3000/client')
    }
    createClient(parameters:any){
        return this.http.post('http://localhost:3000/client', parameters)
    }
    deleteClient(idEmployee:any){
        return this.http.delete(`http://localhost:3000/client/${idEmployee}`);
    }
    getClientById(idEmployee:any){
        return this.http.get(`http://localhost:3000/client/${idEmployee}`);
    }
    PutClient(idEmployee:any, paramters:any){
        return this.http.put(`http://localhost:3000/client/${idEmployee}`, paramters);
    }
};