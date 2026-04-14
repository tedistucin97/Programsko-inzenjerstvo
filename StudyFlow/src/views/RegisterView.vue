<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Registracija</h1>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Unesite email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Lozinka</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Unesite lozinku"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Potvrdi lozinku</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Ponovno unesite lozinku"
            required
          />
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Registracija u tijeku...' : 'Registriraj se' }}
        </button>
      </form>

      <p class="auth-switch">
        Već imaš račun?
        <router-link to="/login">Prijavi se</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { registerUser } from '../services/auth'

export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      loading: false,
    }
  },
  methods: {
    async handleRegister() {
      this.errorMessage = ''

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Lozinke se ne podudaraju.'
        return
      }

      if (this.password.length < 6) {
        this.errorMessage = 'Lozinka mora imati barem 6 znakova.'
        return
      }

      this.loading = true

      try {
        await registerUser(this.email, this.password)
        this.$router.push('/home')
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMessage = 'Ovaj email je već registriran.'
            break
          case 'auth/invalid-email':
            this.errorMessage = 'Email nije ispravnog formata.'
            break
          case 'auth/weak-password':
            this.errorMessage = 'Lozinka je preslaba.'
            break
          default:
            this.errorMessage = 'Došlo je do greške prilikom registracije.'
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f6f8;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.auth-card h1 {
  text-align: center;
  margin-bottom: 24px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 600;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #2d6cdf;
  color: white;
  font-size: 15px;
  cursor: pointer;
}

button:disabled {
  background-color: #8aaee8;
  cursor: not-allowed;
}

.error-message {
  color: #d93025;
  font-size: 14px;
  margin: 0;
}

.auth-switch {
  margin-top: 20px;
  text-align: center;
}
</style>
