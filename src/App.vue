<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue';
import DetailCard from './components/DetailCard.vue';
import DriverActivitiesCard from './components/DriverActivitiesCard.vue';
import DriverBehaviorCard from './components/DriverBehaviorCard.vue';
import MapCard from './components/MapCard.vue';
import { useTheme } from './composables/useTheme';

const { theme, initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="app-wrapper" :class="theme">
    <!-- Navbar -->
    <Navbar />
    
    <!-- Main Content -->
    <div class="main-content">
      <div class="container-fluid px-4">
        <!-- First Row -->
        <div class="row g-4">
          <div 
            class="col-12 col-lg-4" 
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            <DetailCard />
          </div>
          <div 
            class="col-12 col-lg-8" 
            data-aos="fade-left"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            <MapCard />
          </div>
        </div>
        
        <!-- Second Row -->
        <div class="row g-4 mt-3">
          <div 
            class="col-12 col-lg-4" 
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            <DriverBehaviorCard />
          </div>
          <div 
            class="col-12 col-lg-8" 
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            <DriverActivitiesCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: #f9fafb;
  transition: background-color 0.3s ease;
}

.app-wrapper.dark {
  background-color: #111827;
}

.main-content {
  padding: 24px 0;
}

@media (max-width: 991px) {
  .main-content {
    padding: 16px 0;
  }
}
</style>
