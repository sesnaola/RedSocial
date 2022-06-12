<template>
  <div class="flex border-b border-solid border-grey-light">
    <div class="w-1/8 text-right pl-3 pt-3">
      <div>
        <a href="#"
          ><img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            class="rounded-full h-12 w-12 mr-2"
        /></a>
      </div>
    </div>
    <div class="w-7/8 p-3 pl-0">
      <div class="flex justify-between">
        <div>
          <span class="font-bold"
            ><a href="#" class="text-black">
              {{ user.name }} {{ user.surname }}</a
            ></span
          >
          <span class="text-grey-dark">&middot;</span>
          <span class="text-grey-dark">15 Dec 2017</span>
        </div>
      </div>
      <div>
        <div class="mb-4">
          <p class="mb-6">{{ post.text }}</p>
          <!-- Show post data if not is text -->
          <p v-if="isPostText">
            <a href="#"
              ><img
                src="localhost:3080/{{ post.path }}"
                alt="tweet image"
                class="border border-solid border-grey-light rounded-sm"
            /></a>
          </p>
          <p v-if="isPostVideo">
            <a href="#"
              ><img
                src="localhost:3080/{{ post.path }}"
                alt="tweet image"
                class="border border-solid border-grey-light rounded-sm"
            /></a>
          </p>
        </div>
      </div>
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
      // Get user from store
      user: socialnetwork.getUser(this.post.userId).then((res) => {
        this.user = res.data[0];
      }),
      isPostText: this.post.type === "text",
      isPostVideo: this.post.type === "video",
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
