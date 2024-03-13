import {Column, Entity,  PrimaryColumn} from "typeorm"
import { v4 as uuid } from "uuid";

export enum statusTask{
    created = 0,
    inProgress = 1,
    Done = 2
}

@Entity("productList")
export class ProductList{
    @PrimaryColumn()
    id: string;

    @Column({nullable:false})
    name:string

    @Column({nullable:false})
    codebar:string

    @Column({nullable:false})
    brand :string

    @Column({nullable:false})
    category:string

    @Column({nullable:true})
    price:string

    @Column({nullable:true})
    quantity:string


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
