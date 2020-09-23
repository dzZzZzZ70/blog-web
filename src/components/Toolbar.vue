<template>
    <div class="toolbar" dark>
        <div class="empty"></div>
        <div class="logo">
            <!-- <img src="../assets/blog-logo.png"/> -->
            <label>blog</label>
        </div>
        <div class="menu">
            <div :class="$route.name == 'home' ? selectMenu : ''" @click="to('home')">首页</div>
            <div :class="$route.name == 'type' ? selectMenu : ''" @click="to('type')">分类</div>
            <div :class="$route.name == 'label' ? selectMenu : ''" @click="to('label')">标签</div>
            <!-- <div :class="$route.name == 'archive' ? selectMenu : ''" @click="to('archive')">归档</div> -->
            <div :class="$route.name == 'issue' || $route.name == 'neaten' ? selectMenu : ''" @click="to('view')">博客</div>
        </div>
        <div class="query">
            <v-text-field solo size="small" flat append-icon="mdi-magnify" placeholder="搜索"></v-text-field>
        </div>

        <div class="user">
            <!-- <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
            <div>
                ❤dz❤
                <v-icon @click="clickMenu" :class="{'menuHidden' : clicked}">mdi-menu-down</v-icon>
                <v-menu offset-y v-model="clicked">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" icon v-on="on">
                                <v-icon :class="{'menuHidden' : !clicked}">mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in menuItems" :key="index">
                                <v-list-item-title
                                    class="menu-item"
                                    @click="logout"
                                >{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                </v-menu>
            </div> -->
        </div>

        <div class="empty"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectMenu: 'selected'
        }
    },
    methods: {
        to(path) {
            console.log("地址", path);
            this.$router.push({ name: path });
        },
    },
    created() {},
};
</script>

<style scoped>
.toolbar {
    display: flex;
    height: 71px;
    /* background: #ffffff; */
    background: #222222;
    width: 100%;
    margin: 0 auto;
    /* margin-top: 20px; */
    /* border-radius: 8px; */
    color: white;
}

.toolbar .menu {
    width: 70%;
    display: flex;
    align-items: center;
    /* height: 100%; */
    font-size: 14px;
    font-family: PingFang SC;
}

.menu div {
    margin-left: 6%;
    cursor: pointer;
}

.query {
    background: white;
    color: black;
    height: 30px;
    margin-top: 20px;
    border-radius: 5px;
}

.query >>> .v-text-field.v-text-field--solo .v-input__control {
    min-height: 34px;
    width: 300px;
}

.user {
    width: 200px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    width: 100px;
    justify-content: center;
}

.logo label {
    font-size: 33px;
    color: #009999;
}

.empty {
    width: 8%;
}

.selected {
    text-decoration: underline;
}
</style>