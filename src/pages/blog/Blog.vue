<template>
    <div class="main">
        <div class="left-card radius">
            <div class="type">分类</div>
            <v-virtual-scroll bench="10" :items="blogTypeArray" max-height="92%" item-height="40">
                <template v-slot="{item, index}">
                    <!--  <v-list-item :key="index">
                        <v-list-item-action>
                            {{ item.type }}
                        </v-list-item-action>
                        <v-list-item-content></v-list-item-content>
                        <v-list-item-action>
                            <div class="tag">{{ index + 1}}</div>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>-->
                    <div class="left-card-type-div">
                        <div
                            @click="rowClick(item)"
                            @mouseenter="hoverRow = index"
                            @mouseleave="hoverRow = -1"
                            :class="{ 'type-select':index == hoverRow }"
                            style="width: 90%;display:flex;margin: 0 auto"
                        >
                            <div class="left-card-type">{{ item.type }}</div>
                            <div class="tag">{{ index }}</div>
                        </div>
                    </div>
                </template>
            </v-virtual-scroll>
        </div>
        <div v-html="blogContent" class="right-card radius">
           
        </div>
    </div>
</template>

<script>
import { findSettingBlogType, findBlog } from "@/plugins/api";
export default {
    data() {
        return {
            hoverRow: -1,
            current: 0,
            onSelect: false,
            blogTypeArray: [],
            blogContent: '',
            titleHoverRow: -1,
        };
    },

    created() {
        this.findSettingBlogType();
        this.findBlog()
    },

    methods: {
        async findBlog() {
            const sendData = {
                id: this.$route.params.id
            }
            findBlog(sendData).then((res) => {
                this.blogContent = res.result.content;
            });
        },
        async findSettingBlogType() {
            this.blogTypeArray = [];
            const sendData = {
                userAccount: this.$store.state.userInfo.userAccount || 'admin',
            };
            findSettingBlogType(sendData).then((res) => {
                if (res.flag === "0") {
                    this.blogTypeArray = res.result;
                }
            });
        },
    },
};
</script>

<style scoped>
.radius {
    border-radius: 8px;
}

.main {
    background-color: #f7f7f7;
    height: 100%;
    display: flex;
}

.left-card {
    background: #ffffff;
    height: 100%;
    width: 20%;
}

.right-card {
    width: 80%;
    /* background: #ffffff; */
    margin-left: 20px;
    background: #ffffff;
    height: auto;
    padding: 10px;
}

.blog-template {
    padding: 6px 0 6px 0;
    /* height: 180px; */
    background: #ffffff;
    /* line-height: 50px; */


    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden; */
}

.type {
    padding: 6px;
    margin-left: 6px;
    margin-top: 6px;
    font-size: 12px;
}

.tag {
    width: 24px;
    height: 24px;
    background: #f7f7f7;
    text-align: center;
    border-radius: 4px;
    margin-top: 3%;
    margin-left: -10px;
}

.left-card-type-div {
    display: flex;
    /* line-height: 40px; */
    height: 40px;
}

.left-card-type {
    /* background: #f7f7f7; */
    cursor: pointer;
    /* line-height: 40px; */
    width: 92%;
    margin-top: 3%;
    padding-left: 10px;
}

.type-select {
    background: #f7f7f7;
}

.blog-select-title {
    cursor: pointer;
    color: rgb(50, 115, 220);
}

h1,
h2,
h3,
h4 {
    font-weight: normal;
}

.read-more {
    cursor: pointer;
    margin-left: 20px;
    font-size: 12px;
    background: #f7f7f7;
    width: 80px;
    line-height: 30px;
    text-align: center;
}

.blog-title {
    margin-left: 20px;
}

.blog-content {
    /* max-height: 180px;
    overflow: hidden; */
    margin-left: 20px;
}

.blog-margin-top {
    margin-top: 20px;
}
</style>