<template>
    <div class="main">
        <div class="main-sub">
            <v-text-field name="name" label="标题" id="id" v-model="form.title"></v-text-field>

            <v-select
                :items="blogTypeArray"
                item-text="type"
                item-value="type"
                v-model="form.blogType"
                label="选择文章分类"
            ></v-select>
            <Editor class="my-margin-top editor" ref="editor"></Editor>

            <v-btn class="my-margin-top"  @click="submit" color="success">保存</v-btn>
        </div>
    </div>
</template>
<script>
import Editor from "@/components/Editor.vue";
import { findSettingBlogType, saveBusinessBlog } from "../plugins/api";
export default {
    components: {
        Editor
    },

    data() {
        return {
            blogType: "",
            blogLabels: "",
            blogTypeArray: [],
            blogLabelArray: [],
            blog: {
                title: "",
                type: "",
                Labels: ""
            },
            blogTypeId: "",
            form: {
                title: "",
                blogTypeId: "",
                blogType: "",
                content: "",
                blogLabel: ""
            }
        };
    },

    methods: {
        async findSettingBlogType() {
            this.blogTypeArray = [];
            const sendData = {
                userAccount: this.$store.state.userInfo.userAccount || 'admin'
            };
            findSettingBlogType(sendData).then(res => {
                if (res.flag === "0") {
                    this.blogTypeArray = res.result;
                }
            });
        },

        async submit() {
            for (let i = 0, len = this.blogTypeArray.length; i < len; i++) {
                if (this.form.blogType == this.blogTypeArray[i].type) {
                    this.form.blogTypeId = this.blogTypeArray[i].id;
                    break;
                }
            }
            this.form.content = this.$refs.editor.editorContent;
            var sendData = { ...this.form };
            sendData.userAccount = this.$store.state.userInfo.userAccount;

            saveBusinessBlog(sendData)
            .then(res => {
                if (res.flag === '0') {
                    this.$message.success('保存成功')
                }
            })
        }
    },

    created() {
        this.findSettingBlogType();
    }
};
</script>

<style>
.my-margin-top {
    margin-top: 20px;
}

.main {
    border-radius: 8px;
    background: #ffffff;
}

.main-sub {
    width: 96%;
    margin: 0 auto;
}

.w-e-menu {
    z-index: 2 !important;
}
.w-e-text-container {
    z-index: 1 !important;
}

.editor {
    height: 55vh;
}
</style>