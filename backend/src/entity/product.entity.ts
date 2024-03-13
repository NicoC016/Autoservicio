import {Column, Entity,  PrimaryColumn} from "typeorm"
import { v4 as uuid } from "uuid";

export enum statusTask{
    created = 0,
    inProgress = 1,
    Done = 2
}

@Entity("product")
export class Product{
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
  image:string

  @Column({nullable:true})
  weight:string

  @Column({nullable:true})
  unity:string
  
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
