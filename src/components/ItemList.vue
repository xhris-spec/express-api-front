<template>
  <div
    style="
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    "
  >
    <h2>Items</h2>
    <form @submit.prevent="add">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap">
        <input v-model="title" placeholder="Título" />
        <input v-model="description" placeholder="Descripción" />
        <button>Crear</button>
      </div>
    </form>
    <ul>
      <li v-for="i in items" :key="i.id">
        #{{ i.id }} — <strong>{{ i.title }}</strong> — {{ i.description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { listItems, createItem } from "../api";

const items = ref([]);
const title = ref("");
const description = ref("");

async function refresh() {
  const { data } = await listItems();
  items.value = data;
}

async function add() {
  if (!title.value) return;
  await createItem({ title: title.value, description: description.value });
  title.value = "";
  description.value = "";
  await refresh();
}

onMounted(refresh);
</script>
