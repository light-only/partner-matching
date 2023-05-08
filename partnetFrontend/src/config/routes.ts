import Index from "../pages/IndexPage.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import Search from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import UserResult from "../pages/UserResultPage.vue";
import UserLogin from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import TeamCreatePage from "../pages/TeamCreatePage.vue";
import TeamJoinPage from "../pages/TeamJoinPage.vue";


const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team ,title:"找队伍"},
    {path:'/user',component: User,title:"个人中心"},
    {path:'/search',component: Search,title: "搜索队伍"},
    {path:'/edit',component: UserEdit,title:"编辑信息"},
    {path:'/user/list',component: UserResult,title: "用户列表"},
    {path:'/login',component: UserLogin,title: "登录"},
    {path:'/team/add',component: TeamAddPage,title: "新增队伍"},
    {path:'/team/update',component: TeamUpdatePage,title: "更新队伍"},
    {path:'/team/create',component: TeamCreatePage,title: "已创建队伍"},
    {path:'/team/join',component: TeamJoinPage,title:"已加入队伍"},
]

export default routes;
