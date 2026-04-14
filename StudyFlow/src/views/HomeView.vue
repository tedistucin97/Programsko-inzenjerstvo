<template>
  <div class="home-page">
    <div class="home-card">
      <h1>Dobrodošao u StudyFlow</h1>
      <p>Uspješno si prijavljen.</p>

      <button @click="handleLogout">Odjavi se</button>
    </div>
  </div>
</template>

<script>
import { logoutUser } from '../services/auth'

export default {
  name: 'HomeView',
  methods: {
    async handleLogout() {
      try {
        await logoutUser()
        this.$router.push('/login')
      } catch (error) {
        console.error('Greška kod odjave:', error)
      }
    },
  },
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f6f8;
  padding: 20px;
}

.home-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.home-card h1 {
  margin-bottom: 12px;
}

.home-card p {
  margin-bottom: 20px;
  color: #555;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: #d93025;
  color: white;
  font-size: 15px;
  cursor: pointer;
}
</style>
