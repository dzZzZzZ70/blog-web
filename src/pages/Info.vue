<!-- 详情页 -->
<template>
    <div style="margin-top: 15px">
        <v-container grid-list-xs>
            <div>
            <mavon-editor
                v-model="editor"
                style="min-height:450px"
                :editable="false"
                :toolbarsFlag="false"
                defaultOpen="preview"
                :subfield="false"
            />
        </div>

        <v-row>
            <v-col align="center"><v-btn outlined color="deep-orange">赞</v-btn></v-col>
        </v-row>
        </v-container>
        
    </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { findBlog } from '../plugins/api'
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
                this.edit = res.result
                this.editor = res.result.content
            })
        },
    },

    created() {
        if (this.$route.params.id && this.$route.params.id.length > 0) {
            this.findBlog(this.$route.params.id)
        }
    },
};
</script>