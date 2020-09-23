<template>
    <div>
        <!-- <div class="head-menu">
            <router-link class="router-link" to="index">首页</router-link>
            <router-link class="router-link" to="home">写文章</router-link>
            <router-link class="router-link" to="edit">发布</router-link>
        </div>-->
            <Toolbar></Toolbar>
            <!-- <router-view class="router-view"></router-view> -->
            <router-view></router-view>
            <!-- <div class="router-div">
                
            </div> -->
    </div>
</template>

<script>
export default {
    components: {
        Toolbar: () => import('../components/Toolbar')
    },

    data() {
        return {
            clicked: false,
            menuItems: [
                {
                    title: '退出登录'
                }
            ]
        };
    },

    methods: {
        toHome() {
            this.$router.push("home");
        },

        toEdit() {
            this.$router.push("edit");
        },

        clickMenu() {
            this.clicked = !this.clicked;
        },

        logout() {
            this.$store.commit('login', )
            this.$router.push({
                name: 'login'
            })
        }
    },
};
</script>

<style>
body {
    background: #f7f7f7;
}
#inspire {
    /* width: 96%; */
    margin: 0 auto;
    background-color: #f7f7f7;
    height: 60px;
}

.router-div {
    margin-top: 20px;
    /* background: #ffffff; */
    border-radius: 8px;
    /* height: 84%; */
    margin-bottom: 20px;
}

/* .router-view {
    margin: 0 auto;
    width: 98%;
} */

.user {
    display: flex;
    align-items: center;
}

.user div {
    margin-left: 8px;
}

.menuHidden {
    transform: rotate(90deg);
}

.menu-item {
    cursor: pointer;
}
</style>