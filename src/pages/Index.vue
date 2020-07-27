<template>
    <div>
        <div v-for="blog of businessBlogs" v-bind:key="blog._id">
            <BlogCard :blog="blog"></BlogCard>
        </div>
    </div>
</template>

<script>
import BlogCard from "@/components/BlogCard.vue";

export default {
    components: {
        BlogCard
    },

    data() {
        return {
            businessBlogs: []
        }
    },

    methods: {
        async getBusinessBlogs() {
            const sendData = {
                userId: '1'
                // organizationId: this.$store.state.selectedOrganization
                //     .selectedOrganizationId,
                // currentUserAccount: this.$store.state.currentUser.userAccount,
                // md52: this.$store.state.currentUser.md52
            };

            //
            const axiosParams = {
                method: "post",
                url: '47.107.38.90:3333/controller/blog/findBlogByUser',
                data: sendData,
                silence: false
            };
            const response = await this.axios(axiosParams);

            //
            if (response) {
                this.departments = response.data.result;
            }
        }
    },

    created() {
        this.getBusinessBlogs()
    }
};
</script>