<!-- 博客管理-发布页面 -->
<template>
    <div>
        <v-container grid-list-xs>
            <v-tabs v-model="tab" @change="tabChange" color="primary" slider-color="primary" right>
                <v-tab key="isuse">发布</v-tab>
                <v-tab key="neaten">博客管理</v-tab>
            </v-tabs>
        </v-container>
        <v-container grid-list-xs>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<script>
import {
    findBlogByUser,
    saveBusinessBlog,
    deleteBusiness,
    editBusinessBlog,
} from "../../plugins/api";

export default {
    data() {
        return {
            tab: "",
            query: {
                title: "",
                types: [],
                type: "",
            },

            items: [
                // {
                //     title: "用户故事1",
                //     type: "学习日志",
                //     updateTime: "2020-09-17",
                // },
                // {
                //     title: "用户故事2",
                //     type: "学习日志",
                //     updateTime: "2020-09-18",
                // },
                // {
                //     title: "用户故事3",
                //     type: "学习日志",
                //     updateTime: "2020-09-19",
                // },
            ],

            edit: {
                id: "",
                title: "",
                content: "",
                blogType: "",
                blogLabel: "",
                LabelArray: [],
                typeArray: [],
            },

            headers: [
                {
                    text: "标题",
                    align: "start",
                    sortable: false,
                    value: "title",
                },
                { text: "类型", value: "blogType" },
                { text: "更新时间", value: "updateDate" },
                {
                    text: "操作",
                    value: "options",
                    width: "150",
                    align: "center",
                },
            ],
        };
    },

    methods: {
        deleteItem(item) {
            const index = this.items.indexOf(item);
            // todo 调用接口
            confirm("确定要删除这条数据吗?") && this.items.splice(index, 1);
        },

        change(val) {
            // console.log("va", val);
        },

        doQuery() {
            findBlogByUser({
                current: 1,
                size: 10,
            }).then((res) => {
                this.items = res.result;
            });
        },

        getMD(val) {
            this.edit.content = val;
        },

        save() {
            this.$refs["editor"].getMD();
            this.$nextTick(() => {
                if (this.edit.id && this.edit.id.length > 0) {
                    // editBusinessBlog(this.edit)
                    // .then((res) => {
                    //     console.log("修改成功")
                    //     this.tab = 1
                    //     this.cleanEdit()
                    // })
                    // .catch(
                    //     e => {
                    //         console.log('修改失败')
                    //     }
                    // )
                } else {
                    saveBusinessBlog(this.edit)
                        .then((res) => {
                            this.tab = 1;
                            this.cleanEdit();
                        })
                        .catch((e) => {
                            console.log("保存失败");
                        });
                }
            });
        },

        editBlog(item) {
            this.setEdit(item);
            this.tab = 0;
        },

        setEdit(item) {
            this.edit.id = item.id;
            this.edit.title = item.title;
            this.edit.blogType = item.blogType;
            this.edit.blogLabel = item.blogLabel;
            this.edit.content = item.content;
        },

        cleanEdit() {
            this.edit.id = "";
            this.edit.title = "";
            this.edit.blogType = "";
            this.edit.blogLabel = "";
            this.edit.content = "";
        },

        tabChange(val) {
            switch (val) {
                case 0:
                    this.$router.push({ name: "issue" });
                    break;
                default:
                    this.$router.push({ name: "neaten" });
            }
        },
    },

    created() {
        this.doQuery();
    },

    watch: {
        tab(val) {
            if (val === 1) {
                this.doQuery();
            }
        },

        "$route.name": {
            handler: function (val) {
                if (this.$route.name === "neaten") {
                    this.tab = 1;
                    return;
                }

                if (this.$route.name === "issue") {
                    this.tab = 0;
                    return;
                }
            },
        },
    },
};
</script>

<style scoped>
.query {
    display: flex;
}

.query .v-text-field {
    width: 199px;
}

.table-div-button {
    display: flex;
    justify-content: space-evenly;
}
</style>