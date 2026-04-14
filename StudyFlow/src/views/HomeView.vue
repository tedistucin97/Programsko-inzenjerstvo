<template>
  <div class="home-page">
    <div class="home-card">
      <h1>Dobrodošao u StudyFlow</h1>
      <p class="subtitle">Uspješno si prijavljen.</p>

      <div class="info-box">
        <h2>Tvoj studentski planer</h2>
        <p>
          Ovdje ćeš uskoro moći pratiti kolegije, zadatke, rokove i napredak u učenju.
        </p>
      </div>

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
  max-width: 520px;
  width: 100%;
}

.home-card h1 {
  margin-bottom: 10px;
}

.subtitle {
  margin-bottom: 24px;
  color: #555;
}

.info-box {
  background-color: #f8f9fb;
  border: 1px solid #e3e7ee;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: left;
}

.info-box h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.info-box p {
  color: #444;
  line-height: 1.5;
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
