<template>
  <nav class="bg-white dark:bg-gray-800">
    <!-- Button for add new post with Tailwind -->
    <div class="container mx-auto">
      <div class="flex justify-end items-center">
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click="showModal"
        >
          Add new post
        </button>
      </div>
      <!-- user image with dropdown option align right for close sesion with tailwindcss -->
      <div class="flex items-center justify-end">
        <div class="relative">
          <img
            class="rounded-full h-10 w-10"
            src="https://i.pravatar.cc/100"
            alt="avatar"
          />
        </div>
        <div class="ml-3">
          <div class="text-sm">
            <p class="text-gray-600 dark:text-gray-400">pepe@mail.com</p>
            <div class="-mt-1">
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
      <!-- end user image with dropdown option align right for close sesion with tailwindcss -->
      <UserItem v-if="isAutenticate" />
    </div>
  </nav>
</template>

<script>
import "@/assets/index.css";
import UserItem from "./UserItem.vue";
import socialnetwork from "@/services/socialnetwork";

export default {
  name: "NavBar",
  computed: {},
  components: { UserItem },
  methods: {
    logout() {
      socialnetwork.logout();
      window.location.reload();
    },
  },
};
</script>
