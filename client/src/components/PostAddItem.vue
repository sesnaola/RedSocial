<template>
  <div class="login">
    <h1 class="title">Add new Post</h1>
    <form action class="form">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <input class="form-submit" type="submit" value="Login" />
    </form>
    <p class="msg">
      ¿No tienes cuenta?
      <router-link to="/register">Regístrate</router-link>
    </p>
  </div>
</template>

<script>

</script>

<style>
</style>
