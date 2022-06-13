<template>
  <nav class="bg-white dark:bg-gray-800">
    <!-- Button for add new post with Tailwind -->
    <div class="container mx-auto">
      <UserItem v-if="isAutenticate" />
      <div class="flex justify-end items-center">
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click="showModal"
          style="margin-top: 25px; margin-right: 27px"
        >
          Add new post
        </button>
      </div>
      <!-- user image with dropdown option align right for close sesion with tailwindcss -->
      <!-- end user image with dropdown option align right for close sesion with tailwindcss -->
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
  methods: {},
  data() {
    return {
      isAutenticate: socialnetwork.getUserLogged() !== undefined,
    };
  },
};
</script>
