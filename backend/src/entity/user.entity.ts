
import {Column, Entity,  PrimaryColumn} from "typeorm"
import { v4 as uuid } from "uuid";

export enum statusTask{
    created = 0,
    inProgress = 1,
    Done = 2
}

@Entity("user")
export class User{
    @PrimaryColumn()
    id: string;

    @Column({nullable:false})
    email:string

    @Column({nullable:false})
    password:string

    @Column({nullable:false})
    role :string

    @Column({nullable:false})
    isActive:boolean

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}