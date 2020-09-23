<!-- 博客管理-发布页面 -->
<template>
    <div>
        <div>
            <v-container grid-list-xs>
                <v-row>
                    <v-col cols="8" sm="4">
                        <v-text-field
                            dense
                            solo
                            name="name"
                            label="标题"
                            id="id"
                            :v-model="query.title"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="8" sm="4">
                        <v-select dense solo :items="query.types" v-model="query.type" label="类型"></v-select>
                    </v-col>

                    <v-col cols="8" sm="4">
                        <v-btn style="color: white;" @click="doQuery" color="#5BC0DE">搜索</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div>
            <v-container grid-list-xs>
                <v-data-table :headers="headers" :items="items" loading="true">
                    <template v-slot:item.options="{ item }">
                        <div class="table-div-button">
                            <v-btn outlined small @click="editBlog(item)" color="cyan">修改</v-btn>
                            <v-btn outlined small color="error" @click="deleteItem(item)">删除</v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-container>
        </div>
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
            // this.setEdit(item);
            this.$router.push({
                name: 'issue',
                params: {
                    id: item.id
                }
            })
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
            this.cleanEdit();
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
    },
};
</script>

<style scoped>
html {
    overflow: hidden !important;
}
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