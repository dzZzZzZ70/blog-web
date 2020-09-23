<!-- 分类查看页面 -->
<template>
    <div>
        <v-container grid-list-xs>
            <div class="content font-20 title">分类</div>
            <div class="title-div"></div>
            <div class="content">
                <div v-for="(item,index) in items" :key="item.id">
                    <div class="card">
                        <v-row no-gutters>
                            <v-col :cols="item.img ? 8 : 16">
                                <v-row no-gutters @focus="con">
                                    <h4
                                        @click="con(item.id)"
                                        @mouseover="currentIndex = index"
                                        @mouseleave="currentIndex = -1"
                                        :class=" currentIndex == index ? 'cursor-pointer' : ''"
                                        class="font-18"
                                    >{{ item.title }}</h4>
                                </v-row>
                                <v-row no-gutters>
                                    <div
                                        style="margin-top:15px"
                                        class="font-14"
                                    >{{ item.shortContent }}</div>
                                </v-row>
                            </v-col>
                            <v-col v-if="item.img" cols="1"></v-col>
                            <v-col v-if="item.img" cols="2">
                                <img style="width:200px" v-if="item.img" :src="item.img" />
                            </v-col>
                        </v-row>

                        <v-row style="margin-top:20px" no-gutters>
                            <v-col cols="1">
                                <img
                                    v-if="item.authorImg"
                                    style="width:40px; height: 40px; border-radius: 50%;"
                                    :src="item.authorImg"
                                />
                                <img
                                    v-else
                                    style="width:40px; height:40px; border-radius: 50%;"
                                    src="../assets/default-user.png"
                                />
                            </v-col>
                            <v-col
                                cols="1"
                                style="line-height: 40px;"
                                class="font-12"
                            >{{ item.author }}</v-col>
                            <v-col
                                cols="1"
                                style="line-height: 40px;"
                                class="font-12"
                            >{{ item.updateDate }}</v-col>
                        </v-row>
                    </div>

                    <div style="width:95%;margin: 0 auto;">
                        <v-divider v-if="index+1 != items.length"></v-divider>
                    </div>
                </div>
            </div>

            <v-pagination
                v-model="pageEntity.page"
                :value="pageEntity.page"
                :length="pageEntity.totalPages"
            ></v-pagination>
        </v-container>
    </div>
</template>

<script>
import { findBlogPage } from "@/plugins/api";
export default {
    data() {
        return {
            pageEntity: {
                page: 1,
                totalPages: 1,
            },

            currentIndex: null,

            items: [
                // {
                //     id: "1",
                //     title: "故事优选‖胡杨",
                //     short:
                //         "01 深秋，微冷。 阳光钻过人行道树上泛黄的枝叶，洒在了阿七面前的桌子上。 阿七循着光线不停地调整着咖啡杯的角度，试图用手机拍出一张满意的照片来..",
                //     img:
                //         "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4070990129,2861325294&fm=55&app=54&f=JPEG?w=1140&h=640",
                //     authorImg: "https://cdn.vuetifyjs.com/images/john.jpg",
                //     author: "张泉泉",
                //     updateDate: "2020-09-22",
                // },
                // {
                //     id: "2",
                //     title: "故事优选‖胡杨",
                //     short:
                //         "01 深秋，微冷。 阳光钻过人行道树上泛黄的枝叶，洒在了阿七面前的桌子上。 阿七循着光线不停地调整着咖啡杯的角度，试图用手机拍出一张满意的照片来..",
                //     authorImg: "https://cdn.vuetifyjs.com/images/john.jpg",
                //     author: "张泉泉",
                //     updateDate: "2020-09-22",
                // },
                // {
                //     id: "3",
                //     title: "故事优选‖胡杨",
                //     short:
                //         "01 深秋，微冷。 阳光钻过人行道树上泛黄的枝叶，洒在了阿七面前的桌子上。 阿七循着光线不停地调整着咖啡杯的角度，试图用手机拍出一张满意的照片来..",
                //     authorImg: "https://cdn.vuetifyjs.com/images/john.jpg",
                //     author: "张泉泉",
                //     updateDate: "2020-09-22",
                // },
                // {
                //     id: "4",
                //     title: "故事优选‖胡杨",
                //     short:
                //         "01 深秋，微冷。 阳光钻过人行道树上泛黄的枝叶，洒在了阿七面前的桌子上。 阿七循着光线不停地调整着咖啡杯的角度，试图用手机拍出一张满意的照片来..",
                //     authorImg: "https://cdn.vuetifyjs.com/images/john.jpg",
                //     author: "张泉泉",
                //     updateDate: "2020-09-22",
                // },
                // {
                //     id: "5",
                //     title: "故事优选‖胡杨",
                //     short:
                //         "01 深秋，微冷。 阳光钻过人行道树上泛黄的枝叶，洒在了阿七面前的桌子上。 阿七循着光线不停地调整着咖啡杯的角度，试图用手机拍出一张满意的照片来..",
                //     authorImg: "https://cdn.vuetifyjs.com/images/john.jpg",
                //     author: "张泉泉",
                //     updateDate: "2020-09-22",
                // },
            ],
        };
    },

    created() {
        console.log("页面打开");
        this.doQuery();
    },

    methods: {
        doQuery() {
            findBlogPage({
                current: this.pageEntity.page,
                size: 10,
            }).then((res) => {
                this.items = res.result;
                this.pageEntity.page = res.pageEntity.current;
                this.pageEntity.totalPages = res.pageEntity.totalPages;
            });
        },

        con(id) {
            this.$router.push({
                name: "info",
                params: {
                    id,
                },
            });
        },
    },

    watch: {},
};
</script>

<style scoped>
.card-div {
    margin-bottom: 20px;
}

.content {
    margin-top: 10px;
    border: solid 1px #dddddd;
}

.card {
    padding: 30px;
}

.font-12 {
    font-size: 12px;
}

.font-14 {
    font-size: 14px;
}

.font-18 {
    font-size: 18px;
}

.font-20 {
    font-size: 20px;
}

.cursor-pointer {
    cursor: pointer;
    text-decoration: underline;
}

.title {
    color: #00897B;
    padding: 10px 30px;
}

.title-div {
    border: solid 1px #dddddd;
}

.normal-text {
    color: #333333;
}

.tag-text {
    color: #999999;
}
</style>