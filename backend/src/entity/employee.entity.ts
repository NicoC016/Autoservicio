import {Column, Entity,  PrimaryColumn} from "typeorm"
import { v4 as uuid } from "uuid";

export enum statusTask{
    created = 0,
    inProgress = 1,
    Done = 2
}

@Entity("employee")
export class Employee{
    @PrimaryColumn()
    id: string;

    @Column({nullable:false})
    name:string

    @Column({nullable:false})
    lastName:string

    @Column({nullable:false})
    identification :string

    @Column({nullable:true})
    birthdate:string

    @Column({nullable:true})
    city:string

    @Column({nullable:true})
    phoneNumber:string


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
