<template>
  <div class="post">
    <div class="post-header">
      <div class="post-header-left">
        <img
          class="post-header-avatar"
          src="https://i.pravatar.cc/100"
          alt="avatar"
        />
        <div class="post-header-name">
          <h3>Usuario id : {{ post.userId }}</h3>
          <!-- <h3>{{ post.user.name }}</h3>
          <p>{{ post.user.email }}</p> -->
        </div>
      </div>
    </div>
    <div class="post-body">
      <p>{{ post.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.post {
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}
</style>
