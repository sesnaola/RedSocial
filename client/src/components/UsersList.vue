<template>
  <div id="app" class="users">
    <h1 class="title">Lista de Usuarios</h1>
    <table class="w-full">
      <thead class="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          <th class="p-3 text-sm font-semibold tracking-wide text-left">Nº</th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left">
            Name
          </th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left">
            Surname
          </th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left">
            Mail
          </th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-gray-50"
          v-for="(usuario, index) in usuarios"
          v-bind:key="usuario"
        >
          <td class="p3- text-sm text-gray-700">{{ usuario.id }}</td>
          <td class="p3- text-sm text-gray-700">{{ usuario.name }}</td>
          <td class="p3- text-sm text-gray-700">{{ usuario.surname }}</td>
          <td class="p3- text-sm text-gray-700">{{ usuario.mail }}</td>
          <td class="p3- text-sm text-gray-700">
            <button
              class="bg-red-800 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
              @click="eliminar(index)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import socialnetwork from "@/services/socialnetwork";
export default {
  data() {
    return {
      fields: ["id", "name", "surname", "mail", "action"],
      id: "",
      name: "",
      surname: "",
      mail: "",
      usuarios: [],
    };
  },
  mounted() {
    socialnetwork.getUsers().then((res) => (this.usuarios = res.data));
  },
  methods: {
    eliminar(index) {
      try {
        if (!confirm("CONFIRMAR: Eliminar usuarios")) return;
        this.usuarios.splice(index, 1);
        //llamar API para borrar usuario
      } catch (error) {
        console.log(error);
        this.error = true;
      }
    },
  },
};
</script>
