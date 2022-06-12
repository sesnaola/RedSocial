<template>
  <nav class="bg-white dark:bg-gray-800">
    <div class="container mx-auto">
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
import { mapGetters } from "vuex";
import "@/assets/index.css";
import UserItem from "./UserItem.vue";
import socialnetwork from "@/services/socialnetwork";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
  },
  components: { UserItem },
  methods: {
    logout() {
      socialnetwork.logout();
      window.location.reload();
    },
  },
};
</script>
