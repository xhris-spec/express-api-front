<template>
  <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 8px">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap">
        <input v-model="username" placeholder="username" />
        <input v-model="password" placeholder="password" type="password" />
        <button>Entrar</button>
      </div>
      <small>Demo creds: admin / admin123</small>
    </form>
    <p v-if="error" style="color: #c00">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { login } from "../api";

const emit = defineEmits(["logged-in"]);
const state = inject("state");
const username = ref("admin");
const password = ref("admin123");
const error = ref("");

async function submit() {
  error.value = "";
  try {
    const { data } = await login(username.value, password.value);
    state.token = data.access_token;
    emit("logged-in", data.access_token);
  } catch (e) {
    error.value = "Credenciales inválidas";
  }
}
</script>
