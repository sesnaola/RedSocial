<template>
  <div class="posts">
    <div class="posts-header">
      <h2>Posts</h2>
    </div>
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
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
