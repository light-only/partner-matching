import myAxios from "../plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";

/**
 * 获取当前用户信息
 */
export const getCurrentUser = async ()=>{
    //先从本地获取
     const currentUser = getCurrentUserState();
     if(currentUser){
         return currentUser;
     }
     //不存在就从远程获取
    const res = await myAxios.get('/api/user/currentUser');
     if(res?.code === 0){
         setCurrentUserState(res.data);
         return res.data;
     }
     return null;
}
