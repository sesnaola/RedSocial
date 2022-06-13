<template>
  <div class="flex items-center justify-end">
    <div class="relative">
      <p v-if="user.photo">
        <img
          v-bind:src="'http://localhost:3080/' + user.photo"
          alt="avatar"
          class="rounded-full h-12 w-12 mr-2"
        />
      </p>
      <p v-if="!user.photo">
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
    </div>
    <div class="ml-3">
      <div class="text-sm">
        <p class="text-gray-600 dark:text-gray-400">{{ user.mail }}</p>
        <div class="-mt-1" style="margin-top: 1.5px">
          <button
            @click="logout"
            class="text-sm font-medium leading-5 text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
          >
            Sign out
          </button>
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
      user: socialnetwork.getUser(socialnetwork.getUserLogged()).then((res) => {
        this.user = res.data[0];
        console.log(this.user);
      }),
    };
  },
  methods: {
    logout() {
      socialnetwork.logout();
      window.location.reload();
    },
  },
};
</script>

<style></style>
