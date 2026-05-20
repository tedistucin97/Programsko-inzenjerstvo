<template>
  <div class="home-page">
    <section class="hero-card">
      <h1 class="hero-title">
        Dobrodošli u StudyFlow<span v-if="displayName">, {{ displayName }}</span>!
      </h1>
      <p class="hero-lead">
        StudyFlow je tvoja aplikacija za organizaciju studija. Na jednom mjestu
        vodiš kolegije, pratiš zadatke i rokove te pregledavaš napredak u učenju. 
      </p>
    </section>

    <section class="features">
      <h2 class="features-heading">Što možeš raditi?</h2>
      <div class="features-grid">
        <router-link
          v-for="feature in features"
          :key="feature.to"
          :to="feature.to"
          class="feature-card"
        >
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-text">{{ feature.description }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { auth } from '../firebase/config'
import { getUserProfile } from '../services/user'

export default {
  name: 'HomeView',
  data() {
    return {
      displayName: '',
      features: [
        {
          to: '/moji-kolegiji',
          title: 'Moji kolegiji',
          description: 'Dodaj i upravljaj kolegijima koje studiraš.',
        },
        {
          to: '/svi-zadaci',
          title: 'Svi zadaci',
          description: 'Prati zadatke, rokove i status obaveza.',
        },
        {
          to: '/statistika',
          title: 'Statistika',
          description: 'Pregledaj svoj napredak i učinkovitost učenja.',
        },
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

      this.displayName = user.email?.split('@')[0] ?? ''
    },
  },
}
</script>

<style scoped>
.home-page {
  max-width: 900px;
  margin: 0 auto;
}

.hero-card {
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e3e7ee;
}

.hero-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.hero-lead {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  max-width: 640px;
}

.features {
  margin-top: 32px;
}

.features-heading {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.feature-card {
  display: block;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e3e7ee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, box-shadow 0.15s, background-color 0.15s;
}

.feature-card:hover {
  border-color: #2d6cdf;
  background-color: #f8faff;
  box-shadow: 0 8px 20px rgba(45, 108, 223, 0.12);
}

.feature-title {
  font-size: 17px;
  font-weight: 600;
  color: #2d6cdf;
  margin-bottom: 8px;
}

.feature-text {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}
</style>
