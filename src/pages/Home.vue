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
                            <div class="tag">{{ item.qty }}</div>
                        </div>
                    </div>
                </template>
            </v-virtual-scroll>
        </div>

        <!-- <div class="right-card radius">
            <v-virtual-scroll :items="blogArray" >
                <template v-slot="{item, index}">
                    <div class="blog-template radius">
                        <div class="blog-title">
                            <h2
                                @mouseleave="titleHoverRow = -1"
                                @mouseenter="titleHoverRow = index"
                                :class="{ 'blog-select-title': index == titleHoverRow }"
                            >{{item.title}}</h2>
                        </div>
                        <div class="blog-content">{{ item.content }}}</div>
                        <div class="read-more radius">阅读更多</div>
                    </div>
                </template>
            </v-virtual-scroll>
        </div>-->
        <div class="right-card radius">
            <div
                v-for="(item,index) in blogArray"
                :key="item.id"
                class="blog-template radius"
                :class="{ 'blog-margin-top' : index > 0 }"
            >
                <div class="blog-title">
                    <h2
                        @click="vistiBlog(item.id)"
                        @mouseleave="titleHoverRow = -1"
                        @mouseenter="titleHoverRow = index"
                        :class="{ 'blog-select-title': index == titleHoverRow }"
                    >{{item.title}}</h2>
                </div>
                <div class="blog-content" v-html="item.shortContent"></div>
                <div class="read-more radius" @click="vistiBlog(item.id)">阅读更多</div>
            </div>
        </div>

        <div class="new-blog radius">
            <div class="type">最新文章</div>
        </div>
    </div>
</template>

<script>
import { findSettingBlogType, findBlogByBlogType } from "@/plugins/api";
export default {
    data() {
        return {
            hoverRow: -1,
            current: 0,
            onSelect: false,
            blogTypeArray: [],
            blogArray: [],
            titleHoverRow: -1,
        };
    },

    created() {
        this.findSettingBlogType().then((res) => {
            if (this.$route.params && this.$route.params.id) {
                const send = {
                    blogTypeId: this.$route.params.id,
                    size: 15,
                    current: 0,
                };
                this.findBlogByType(send);
            } else {
                if (this.blogTypeArray.length > 0) {
                    const send = {
                        blogTypeId: this.blogTypeArray[0].id,
                        size: 15,
                        current: 0,
                    };
                    this.findBlogByType(send);
                }
            }
        });
    },

    methods: {
        async rowClick(item) {
            const sendData = {
                blogTypeId: item.id,
                size: 15,
                current: 0,
            };
            this.findBlogByType(sendData);
        },

        findBlogByType(data) {
            return new Promise((resolve, reject) => {
                this.blogArray = [];
                findBlogByBlogType(data).then((res) => {
                    this.blogArray = res.pageEntity.records;
                    return resolve();
                });
            });
        },
        findSettingBlogType() {
            return new Promise((resolve, reject) => {
                this.blogTypeArray = [];
                const sendData = {
                    userAccount:
                        this.$store.state.userInfo.userAccount || "admin",
                };
                findSettingBlogType(sendData).then((res) => {
                    if (res.flag === "0") {
                        this.blogTypeArray = res.result;
                        return resolve();
                    }
                });
            });
        },

        /**
         * 查看博客
         */
        vistiBlog(id) {
            this.$router.push({
                name: "visti",
                // path: `/visti`,
                params: { id: id },
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
    width: 56%;
    /* background: #ffffff; */
    margin-left: 20px;
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

.new-blog {
    margin-left: 2%;
    width: 20%;
    background: #ffffff;
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