<template>
    <el-container class="home-container">
        <!-- 页面头部 -->
        <el-header>
        <div>
            <img src="../../public/gbn-logo.png" alt />
            <span>GNB商城后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出登录</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
            <!-- 侧边栏菜单 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 折叠菜单按钮 -->
                <div class="toggle-btn" @click="toggleCollapse">|||</div>
                <!-- 
                    :router="true" 侧边栏开启路由模式
                -->
                <el-menu background-color="#333744" text-color="#fff" :router="true"
                :default-active="activePath"
                unique-opened :collapse="isCollapse" :collapse-transition="false"
                active-text-color="#ffd04b">
                <!-- 一级菜单 -->
                    <!-- index 只接收字符串 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <i :class="icons[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 内容显示 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            // 左侧菜单列表
            menuList: {},
            icons: {
                '125': 'iconfont icon-user',
                '103': 'iconfont icon-tijikongjian',
                '101': 'iconfont icon-shangpin',
                '102': 'iconfont icon-danju',
                '145': 'iconfont icon-baobiao'
            },
            isCollapse: false,  // 默认不折叠
            activePath: '', // 被激活的动态链接地址
        };
    },
    created(){
        this.getMentList();
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
        logout() {
            window.sessionStorage.setItem('token', {});
            this.$router.push('/')
        },
        // 获取所有的菜单
        async getMentList(){
            const {data:res} = await this.$http.get('menus');
            if(res.meta.status != 200) return this.$message.err(res.meta.msg)
            this.menuList = res.data;
            // console.log(res);
        },
        // 菜单折叠与展开时间
        toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        },
        saveNavState(activePath){
            // 保存链接的激活状态
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }

    }
};
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}
.el-container {
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
        > div {
            display: flex;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
                margin-left: 30px;
            }
            span {
                margin-left: 15px;
            }
        }
    }
    .el-aside {
        background-color: #333744;
        .toggle-btn {
            background-color: #4a5064;
            font-size: 10px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            letter-spacing: 0.2em;
            cursor: pointer;
        }
        .el-menu {
            border-right: 0;
        }
    }
    .el-main {
        background-color: #eaedf1;
    }
}
</style>