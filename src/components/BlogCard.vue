<template>
    <div>
        <el-card>
            <span>{{ blog.title }}</span>
            <div>{{ blog.content }}</div>
            <div slot="flot">as</div>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        blog: {
            default: function () {
                return {}
            }
        }
    },

    data () {
        return {
            businessBlogs: []
        }
    },

    methods: {

    }
}
</script>