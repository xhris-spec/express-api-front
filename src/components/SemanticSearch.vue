<template>
  <div
    style="
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    "
  >
    <h2>Búsqueda Semántica</h2>
    <form @submit.prevent="run">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap">
        <input v-model="query" placeholder="Buscar..." />
        <button>Buscar</button>
      </div>
    </form>
    <ul>
      <li v-for="r in results" :key="r.id">
        #{{ r.id }} — {{ r.title }} — score: {{ r.score.toFixed(3) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { semanticSearch } from "../api";

const query = ref("");
const results = ref([]);

async function run() {
  if (!query.value) return;
  const { data } = await semanticSearch(query.value, 5);
  results.value = data.results;
}
</script>
