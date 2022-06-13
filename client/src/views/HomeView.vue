<template>
  <div class="home">
    <div v-if="isAutenticate">
      <NavBar />
      <div class="home__content__body">
        <PostsView />
      </div>
    </div>
    <LoginView v-if="!isAutenticate" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginView from "@/views/LoginView.vue";
import NavBar from "@/components/NavBar.vue";
import PostsView from "./PostsView.vue";
import socialnetwork from "@/services/socialnetwork";

export default {
  name: "HomeView",
  data: () => ({
    isAutenticate: socialnetwork.getUserLogged() !== undefined,
  }),
  components: {
    LoginView,
    NavBar,
    PostsView,
  },
};
</script>
