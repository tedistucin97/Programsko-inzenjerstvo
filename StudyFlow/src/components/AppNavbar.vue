<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/home" class="logo-link">
        <img src="/logo.png" alt="StudyFlow" class="logo" />
      </router-link>
    </div>

    <div class="navbar-center">
      <router-link
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="nav-link"
        active-class="nav-link--active"
      >
        {{ link.label }}
      </router-link>
    </div>

    <div class="navbar-right">
      <span class="user-name">{{ displayName }}</span>
      <button type="button" class="logout-btn" @click="handleLogout">Odjavi se</button>
    </div>
  </nav>
</template>

<script>
import { logoutUser } from '../services/auth'
import { getUserProfile } from '../services/user'
import { auth } from '../firebase/config'

export default {
  name: 'AppNavbar',
  data() {
    return {
      displayName: '',
      navLinks: [
        { to: '/moji-kolegiji', label: 'Moji kolegiji' },
        { to: '/svi-zadaci', label: 'Svi zadaci' },
        { to: '/statistika', label: 'Statistika' },
      ],
    }
  },
  async mounted() {
    await this.loadUserName()
  },
  methods: {
    async loadUserName() {
      const user = auth.currentUser
      if (!user) return

      try {
        const profile = await getUserProfile(user.uid)
        if (profile?.firstName || profile?.lastName) {
          this.displayName = [profile.firstName, profile.lastName].filter(Boolean).join(' ')
          return
        }
      } catch (error) {
        console.error('Greška kod učitavanja profila:', error)
      }

      this.displayName = user.email ?? 'Korisnik'
    },
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
.navbar {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 24px;
  padding: 0 32px 0 0;
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #e3e7ee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.navbar-left,
.navbar-center,
.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-left {
  flex: 1;
  justify-content: flex-start;
  align-self: stretch;
  margin: 0;
  padding: 0;
}

.navbar-center {
  flex: 0 0 auto;
  gap: 8px;
  align-self: center;
}

.navbar-right {
  flex: 1;
  justify-content: flex-end;
  gap: 16px;
  align-self: center;
}

.logo-link {
  display: block;
  height: 100%;
  line-height: 0;
}

.logo {
  height: 100%;
  width: auto;
  display: block;
  object-fit: contain;
  object-position: left center;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  color: #444;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: background-color 0.15s, color 0.15s;
}

.nav-link:hover {
  background-color: #f0f4fc;
  color: #2d6cdf;
}

.nav-link--active {
  background-color: #e8f0fe;
  color: #2d6cdf;
}

.user-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.logout-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #d93025;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s;
}

.logout-btn:hover {
  background-color: #b3261e;
}
</style>
