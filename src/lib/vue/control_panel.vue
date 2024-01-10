<template>
  <div class="app">
    <nav>
      <router-link to="/indexes">Indexes</router-link>
      <router-link to="/settings">Settings</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "CluerApp",
})
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
nav {
  background-color: #eee;
  padding: 10px;
}
main {
  flex-grow: 1;
  padding: 20px;
}
</style>
