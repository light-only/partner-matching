/**
 * 用户数据类型
 */
export type UserType = {
    id:number;
    username:string;
    userAccount:string;
    avatarUrl?:string;
    gender:number;
    phone:string;
    email:string;
    userStatus:number;
    userRole:number;
    planetCode:number;
    tags:string[];
    createTime:Date;
}
