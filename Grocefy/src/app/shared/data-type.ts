export interface addProduct{
    pName:string,
    pCategory:string,
    pPrice:number,
    pDescription:string,
    pCheck:boolean,
    pImage:string
    id:number,
    quantity:undefined | number,
    productId:number | undefined  
}

export interface SingUp{
    first_name:string,
    last_name:string,
    primary_mobile_number:number
    primary_email:string,
    username:string,
    password:string
}
export interface login{
    email:string,
    pass:string,
    id:number
}

export interface userLogin{
    username:string,
    password:string
}


export interface cart{
    pName:string,
    pCategory:string,
    pPrice:number,
    pDescription:string,
    pCheck:boolean,
    pImage:string
    id:number | undefined,
    quantity:undefined | number,
    userId:number,
    productId:number |undefined
}

 export interface Address {
    address_line_1: string;
    address_line_2: string;
    area: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    landmark: string;
    tag: string;
    id: string
  }
  