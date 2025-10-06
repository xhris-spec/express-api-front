<template>
  <main
    style="
      max-width: 900px;
      margin: 2rem auto;
      font-family: ui-sans-serif, system-ui;
    "
  >
    <h1>Senior Express Demo</h1>
    <LoginForm @logged-in="onLogin" />
    <section v-if="token" style="margin-top: 1.5rem">
      <ItemList />
      <SemanticSearch />
    </section>
  </main>
</template>

<script setup>
import { inject, computed } from "vue";
import LoginForm from "./components/LoginForm.vue";
import ItemList from "./components/ItemList.vue";
import SemanticSearch from "./components/SemanticSearch.vue";

const state = inject("state");
const token = computed(() => state.token);

function onLogin(t) {
  state.token = t;
}
</script>
