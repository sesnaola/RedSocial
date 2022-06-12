<template>
  <div
    class="relative z-10 rounded-lg shadow-xl text-slate-900 mx-auto sm:w-[50.4375rem] dark:text-slate-300"
  >
    <div
      class="mt-1 flex items-center space-x-2 bg-white rounded-lg overflow-hidden ring-1 ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/5 dark:ring-0 text-center"
    >
      <div class="relative z-10 overflow-hidden flex-none w-24 h-24">
        <img
          class="absolute w-14 h-14 object-cover bg-slate-100 rounded-full"
          src="https://i.pravatar.cc/100"
          alt="avatar"
        />
      </div>
      <div class="post-header-name">
        <h3>Usuario idd : {{ user }}</h3>
        <!-- <h3>{{ post.user.name }}</h3>
        <p>{{ post.user.email }}</p> -->
      </div>
    </div>
    <div class="pt-6">
      <p>{{ post.text }}</p>
    </div>
  </div>
</template>

<script>
import socialnetwork from "@/services/socialnetwork";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: socialnetwork.getUser(this.post.userId),
    };
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
