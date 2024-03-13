import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entity/employee.entity';
import { EmployeeDTO } from 'src/DTO/employee/employeed.dto';
import { AddEmployeeDTO } from 'src/DTO/employee/addEmployeed.dto';
import { UpdateEmployeeDTO } from 'src/DTO/employee/updateEmployee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  ) {}

  public async createOne(addEmployeeRequest: AddEmployeeDTO) {
    const employee = new Employee();
    employee.name = addEmployeeRequest.name;
    employee.lastName = addEmployeeRequest.lastName;
    employee.birthdate = addEmployeeRequest.birthdate;
    employee.city = addEmployeeRequest.city;
    employee.identification = addEmployeeRequest.identification;
    employee.phoneNumber = addEmployeeRequest.phoneNumber;
    
    await this.employeeRepository.save(employee);

    const employeeDTO = this.entityToDTO(employee);

    return employeeDTO;
  }

  public async getOne(id) {
    const employee: Employee = await this.employeeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!employee) {
      throw new NotFoundException(` El producto no existe`);
    }

    const employeeDTO: EmployeeDTO = this.entityToDTO(employee);
    return employeeDTO;
  }

  private entityToDTO(employeeNew: Employee): EmployeeDTO {
    const employee = new EmployeeDTO();
    employee.id = employeeNew.id;
    employee.name = employeeNew.name;
    employee.lastName = employeeNew.lastName;
    employee.birthdate = employeeNew.birthdate;
    employee.city = employeeNew.city;
    employee.identification = employeeNew.identification;
    employee.phoneNumber = employeeNew.phoneNumber;
    return employee;
  }

  public async getAll() {
    const product: Employee[] = await this.employeeRepository.find();

    const productDTO: EmployeeDTO[] = product.map((x) => this.entityToDTO(x));

    return productDTO;
  }

  public async updateOne(noteId: string, updateEmployeedRequest: UpdateEmployeeDTO) {

    const employee: Employee = await this.getOne(noteId);
    
    employee.name = updateEmployeedRequest.name;
    employee.lastName = updateEmployeedRequest.lastName;
    employee.birthdate = updateEmployeedRequest.birthdate;
    employee.city = updateEmployeedRequest.city;
    employee.identification = updateEmployeedRequest.identification;
    employee.phoneNumber = updateEmployeedRequest.phoneNumber;

    //actualizamos y guardamos la tarea
    await this.employeeRepository.save(employee);

    //Retornamos la tarea formato dto
    const employeeDTO: EmployeeDTO = await this.entityToDTO(employee);

    return employeeDTO;
  }

  public async deleteOne(id: string) {
    //buscamos la tarea por id
    const employee: Employee = await this.getOne(id);

    //eliminamos la tarea por
    await this.employeeRepository.remove(employee);
  }
}
