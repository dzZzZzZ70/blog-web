<template>
    <div>
        <!-- <div class="head-menu">
            <router-link class="router-link" to="index">首页</router-link>
            <router-link class="router-link" to="home">写文章</router-link>
            <router-link class="router-link" to="edit">发布</router-link>
        </div>-->
        <v-app id="inspire">
            <div class="toolbar" dark>
                <div class="menu">
                    <div @click="toHome">首页</div>
                    <div @click="toEdit">写作</div>
                </div>
                <div class="user">
                    <v-avatar>
                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                    </v-avatar>
                    <div>❤dz❤</div>
                </div>
            </div>
            <div class="router-div">
                <router-view class="router-view"></router-view>
            </div>
        </v-app>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },

    methods: {
        toHome() {
            this.$router.push("home");
        },

        toEdit() {
            this.$router.push("edit");
        }
    }
};
</script>

<style>
body {
    background: #f7f7f7;
}
#inspire {
    width: 96%;
    margin: 0 auto;
    background-color: #f7f7f7;
    height: 60px;
}

.toolbar {
    display: flex;
    height: 60px;
    background: #ffffff;
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 8px;
}

.toolbar .menu {
    width: 84%;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 20px;
}

.menu div {
    margin-left: 6%;
    cursor: pointer;
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
    display:flex;
    align-items: center
}

.user div {
    margin-left: 8px;
}
</style>