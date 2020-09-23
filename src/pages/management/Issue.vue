<template>
    <div>
        <div>
            <v-text-field name="name" label="标题" v-model="edit.title" solo dense></v-text-field>
        </div>
        <div>
            <mavon-editor v-model="editor" style="min-height:450px" />
        </div>
        <div>
            <v-row>
                <v-col>
                    <v-select no-data-text="" solo dense :items="items" v-model="edit.blogType" label="分类"></v-select>
                </v-col>

                <v-col>
                    <v-select no-data-text="" solo dense :items="items" v-model="edit.blogLabel" label="标签"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col align="center"><v-btn color="success" @click="save" dense>发布</v-btn></v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { findBlog, saveBusinessBlog, editBusinessBlog } from '../../plugins/api'
export default {
    components: {
        mavonEditor,
    },
    data() {
        return {
            editor: "",
            title: "",
            content: "",
            blogType: "",
            blogLabel: "",
            edit: {},
            items: [],
        };
    },

    methods: {
        findBlog(id) {
            findBlog({id}).then(res => {
                console.log('查询成功', res)
                this.edit = res.result
                this.editor = res.result.content
            })
        },

        save() {
            this.edit.content = this.editor
            this.$nextTick(() => {
                if (this.$route.params.id && this.$route.params.id.length > 0) {
                    editBusinessBlog(this.edit)
                    .then((res) => {
                        console.log("修改成功")
                    })
                    .catch(
                        e => {
                            console.log('修改失败')
                        }
                    )
                } else {
                    saveBusinessBlog(this.edit)
                        .then((res) => {
                            console.log("新增成功")
                        })
                        .catch((e) => {
                            console.log("保存失败");
                        });
                }
            });
        }
    },

    created() {
        console.log(this.$route.params);
        if (this.$route.params.id && this.$route.params.id.length > 0) {
            this.findBlog(this.$route.params.id)
        }
    },
};
</script>