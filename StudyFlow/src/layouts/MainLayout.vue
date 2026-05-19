<template>
  <div class="main-layout">
    <AppNavbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue'

export default {
  name: 'MainLayout',
  components: {
    AppNavbar,
  },
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f6f8;
}

.main-content {
  flex: 1;
  padding: 32px;
}
</style>
