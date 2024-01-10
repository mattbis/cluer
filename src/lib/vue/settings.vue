<template>
    <div>
      <h1>Settings</h1>
      <label for="theme">Theme:</label>
      <select id="theme" v-model="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button @click="saveSettings">Save Settings</button>
    </div>
  </template>

  <script>
  import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {
        theme: "light",
      }
    },
    methods: {
      saveSettings() {
        console.log("Settings saved!", this.theme)
      },
    },
  })
  </script>
