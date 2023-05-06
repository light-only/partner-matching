import {UserType} from './user'

export type TeamType = {
    id:number;
    userId:string;
    name:string;
    description:string;
    expireTime:Date;
    maxNum:number;
    password:string;
    status:number;
    createTime:Date;
    updateTime:Date;
    createUser:UserType;
}
