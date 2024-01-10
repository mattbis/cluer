<template>
    <div>
      <h1>Indexes</h1>
      <ul>
        <li v-for="indexType in indexes" :key="index.id">
          {{ index.name }} - {{ index.props }}
        </li>
      </ul>
    </div>
  </template>

  <script>
  import { defineComponent } from "vue"

  export default defineComponent({
    data() {
      return {
        indexes: [],
      }
    },
    mounted() {
    },
  })
  </script>
