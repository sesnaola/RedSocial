<template>
  <div class="flex border-b border-solid border-grey-light">
    <div class="w-1/8 text-right pl-3 pt-3" style="margin-right: 1vh">
      <div>
        <a href="#">
          <p v-if="isProfilePhoto">
            <img
              v-bind:src="'http://localhost:3080/' + post.user.photo"
              alt="avatar"
              class="rounded-full h-12 w-12 mr-2"
              style="
                display: block;
                max-width: 50px;
                max-height: 50px;
                width: auto;
                height: auto;
              "
            />
          </p>
          <p v-if="!isProfilePhoto">
            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              class="rounded-full h-12 w-12 mr-2"
              style="
                display: block;
                max-width: 50px;
                max-height: 50px;
                width: auto;
                height: auto;
              "
            />
          </p>
        </a>
      </div>
    </div>
    <div class="w-7/8 p-3 pl-0">
      <div class="flex justify-between">
        <div>
          <span class="font-bold"
            ><a href="#" class="text-black">
              {{ post.user.name }} {{ post.user.surname }}</a
            ></span
          >
          <span class="text-grey-dark" style="margin: 5px">&middot;</span>
          <span class="text-grey-dark">{{ postDate }}</span>
        </div>
      </div>
      <div>
        <div class="mb-4">
          <p class="mb-6">{{ post.text }}</p>
          <!-- Show post data if is not text -->
          <p v-if="isPostImage" style="text-align: center">
            <a href="#">
              <img
                v-bind:src="'http://localhost:3080/' + post.path"
                alt="image"
                class="border border-solid border-grey-light rounded-sm"
            /></a>
          </p>
          <p v-if="isPostVideo">
            <a href="#">
              <video
                v-bind:src="'http://localhost:3080/' + post.path"
                controls
                class="border border-solid border-grey-light rounded-sm"
              ></video>
            </a>
          </p>
          <p v-if="isPostAudio">
            <a href="#">
              <audio
                v-bind:src="'http://localhost:3080/' + post.path"
                controls
                class="border border-solid border-grey-light rounded-sm"
              ></audio>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import socialnetwork from "@/services/socialnetwork";
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
      // user: socialnetwork.getUser(this.post.userId).then((res) => {
      //   this.user = res.data[0];
      // }),
      isPostText: this.post.postType === "text",
      isPostImage: this.post.postType === "image",
      isPostVideo: this.post.postType === "video",
      isPostAudio: this.post.postType === "audio",
      isProfilePhoto: this.post.user.photo !== "",
      postDate: new Date(this.post.creationDate * 1000).toLocaleString(),
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
