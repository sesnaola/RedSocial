<template>
  <div class="flex items-center justify-end">
    <div class="relative">
      <img
        class="rounded-full h-10 w-10"
        v-bind:src="'http://localhost:3080/' + user.photo"
        alt="avatar"
      />
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
