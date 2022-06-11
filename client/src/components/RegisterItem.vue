<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#name">Nombre:</label>
      <input
        v-model="name"
        class="form-input"
        type="name"
        id="name"
        required
        placeholder="Name"
      />
      <label class="form-label" for="#surname">Apellido:</label>
      <input
        v-model="surname"
        class="form-input"
        type="surname"
        id="surname"
        required
        placeholder="Surname"
      />
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
        required
        placeholder="Password"
      />
      <label class="form-label" for="#password-repeat"
        >Repite la contraeña:</label
      >
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        required
        placeholder="Password"
      />
      <p v-if="error" class="error">
        {{ error }}
      </p>
      <input class="form-submit" type="submit" value="Sign Up" />
    </form>
  </div>
</template>

<script>
import socialnetwork from "@/services/socialnetwork";

export default {
  data: () => ({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordRepeat: "",
    error: "",
  }),
  methods: {
    // TODO - Implementar error en el formulario de registro (en el mismo componente)
    async register() {
      const mail = this.email;
      const pass = this.password;
      try {
        if (this.password != this.passwordRepeat) {
          throw new Error("Passwords don't match");
        }
        await socialnetwork
          .register(this.name, this.surname, this.email, btoa(this.password))
          .then(function () {
            socialnetwork
              .login(mail, btoa(pass))
              .then((res) =>
                socialnetwork.setUserLogged(res.data.token, res.data.user.id)
              );
          });
        this.$router.push("/");
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>
