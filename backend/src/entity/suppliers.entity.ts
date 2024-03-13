import {Column, Entity,  PrimaryColumn} from "typeorm"
import { v4 as uuid } from "uuid";

export enum statusTask{
    created = 0,
    inProgress = 1,
    Done = 2
}

@Entity("supplier")
export class Supplier{
    @PrimaryColumn()
    id: string;

    @Column({nullable:false})
    name:string

    @Column({nullable:false})
    cuit:string

    @Column({nullable:false})
    categoryAfip :string

    @Column({nullable:false})
    categoryProducts:string

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
