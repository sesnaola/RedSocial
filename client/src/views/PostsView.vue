/* eslint-disable prettier/prettier */
<template>
  <div class="posts">
    <!-- Title post with tailwind -->
    <div class="posts-header">
      <h2 class="text-5xl font-bold leading-normal mt-0">Posts</h2>
    </div>
    <div class="w-full mx-auto lg:w-1/2 bg-white mb-4">
      <div
        class="p-3 text-lg font-bold border-b border-solid border-grey-light"
      ></div>
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import socialnetwork from "@/services/socialnetwork";
import PostItem from "@/components/PostItem.vue";
export default {
  data() {
    return {
      posts: null,
    };
  },
  components: {
    PostItem,
  },
  async created() {
    await this.getPosts();
  },
  methods: {
    async getPosts() {
      await socialnetwork.getPosts().then((res) => {
        this.posts = res.data.posts;
      });
    },
  },
};
</script>

<style></style>
