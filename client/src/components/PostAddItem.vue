<template>
  <div class="postadd">
    <h1 class="title">Add new Post</h1>
    <form action class="form">
      <label class="form-label">Seleccionar Publicación</label>
      <select class="form-input" v-model="selected">
        <option>Texto</option>
        <option>Imagen</option>
        <option>Audio</option>
        <option>Video</option>
      </select>
      <label class="form-label" for="message">Añadir nueva Publicación</label>
      <textarea
        id="message"
        rows="5"
        class="form-input"
        v-model="message"
        required
        placeholder="Descripción"
      ></textarea>
      <br />
      <br />
      <div v-if="selected != 'Texto'">
        <label class="form-label">Subir: {{ selected }}</label>
        <input class="form-input" type="file" name="imagen" />
      </div>
      <input class="form-submit" type="submit" value="Publicar" />
    </form>
  </div>
</template>
<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      selected: "Texto",
    };
  },
};
</script>

<style lang="scss" scoped>
.postadd {
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

.msg {
  margin-top: 3rem;
  text-align: center;
}
</style>
