<template>
  <div class="home">
    <NavBar v-if="isAutenticate" />
    <div class="home__content">
      <div class="home__content__title">
        <h1 class="text-3xl font-semibold text-slate-900">HOME</h1>
      </div>
      <div class="home__content__body">
        <PostsView v-if="isAutenticate" />
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

console.log("test", socialnetwork.getUserLogged());
console.log(socialnetwork.getUserLogged() === undefined);

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
