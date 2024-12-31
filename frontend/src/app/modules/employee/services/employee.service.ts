import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
    
@Injectable()
export class EmployeeService {
    constructor(
        private http: HttpClient,
    ){}
    getEmployee(){
        return this.http.get('http://localhost:3000/employee');
    }
    createEmployee(parameters:any){
        return this.http.post('http://localhost:3000/employee', parameters);
    }
    deleteSupplier(idEmployee:any){
        return this.http.delete(`http://localhost:3000/employee/${idEmployee}`);
    }
    getEmployeeById(idEmployee:any){
        return this.http.get(`http://localhost:3000/employee/${idEmployee}`);
    }
    PutEmployee(idEmployee:any, paramters:any){
        return this.http.put(`http://localhost:3000/employee/${idEmployee}`, paramters);
    }
};