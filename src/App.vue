<template>
  <main class="container">
    <h1>Welcome to Tauri + Vue</h1>

    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img alt="Vite logo" class="logo vite" src="/vite.svg" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img alt="Tauri logo" class="logo tauri" src="/tauri.svg" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img alt="Vue logo" class="logo vue" src="./assets/vue.svg" />
      </a>
    </div>
    <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

    <form class="row" @submit.prevent="greet">
      <input id="greet-input" v-model="name" placeholder="Enter a name..." />
      <button type="submit">Greet</button>
    </form>
    <p>{{ greetMsg }}</p>
  </main>
</template>
<script lang="ts" setup>
import { invoke } from "@tauri-apps/api/core";
import { ref } from "vue";

const greetMsg = ref("");
const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>
<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
<style>
:root {
  background-color: #f6f6f6;
  color: #0f0f0f;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-synthesis: none;
  font-weight: 400;
  line-height: 24px;
  text-rendering: optimizelegibility;
  text-size-adjust: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 10vh;
  margin: 0;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  transition: 0.75s;
  will-change: filter;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

.row {
  display: flex;
  justify-content: center;
}

a {
  color: #646cff;
  font-weight: 500;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

input,
button {
  padding: 0.6em 1.2em;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 2px rgb(0 0 0 / 20%);
  color: #0f0f0f;
  font-family: inherit;
  font-size: 1em;
  font-weight: 500;
  outline: none;
  transition: border-color 0.25s;
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}

button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

#greet-input {
  margin-right: 5px;
}

@media (prefers-color-scheme: dark) {
  :root {
    background-color: #2f2f2f;
    color: #f6f6f6;
  }

  a:hover {
    color: #24c8db;
  }

  input,
  button {
    background-color: #0f0f0f98;
    color: #fff;
  }

  button:active {
    background-color: #0f0f0f69;
  }
}
</style>
