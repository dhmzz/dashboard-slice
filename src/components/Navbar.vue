<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElSwitch, ElIcon } from 'element-plus'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useTheme } from '../composables/useTheme'

const activeTab = ref('overview')
const mobileMenuOpen = ref(false)

const { theme, toggleTheme } = useTheme()

// Computed property untuk el-switch (true = dark, false = light)
const isDarkMode = computed({
  get: () => theme.value === 'dark',
  set: (_value) => {
    toggleTheme()
  }
})

const tabs = [
  { id: 'overview', label: 'OVERVIEW'},
  { id: 'live-tracking', label: 'LIVE TRACKING'},
  { id: 'driver-behavior', label: 'DRIVER BEHAVIOR'},
  { id: 'notifications', label: 'NOTIFICATIONS' }
]

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <nav class="navbar" :class="theme">
    <div class="container-fluid">
      <div class="driver-info">
        <div class="driver-avatar">
          <img src="https://ui-avatars.com/api/?name=Asep+Gunawan&background=e5e7eb&color=6b7280&size=48" alt="Driver Avatar">
        </div>
        <div class="driver-details">
          <h2 class="driver-name">Asep Gunawan</h2>
          <p class="driver-phone">081XXXXXXXXX</p>
        </div>
      </div>

      <div class="navbar-right">
        <el-button class="mx-0" type="primary">
          Edit Driver
        </el-button>

        <el-switch 
          v-model="isDarkMode"
          class="theme-switch"
          size="large"
        >
          <template #active-action>
            <el-icon :size="16">
              <Moon />
            </el-icon>
          </template>
          <template #inactive-action>
            <el-icon :size="16">
              <Sunny />
            </el-icon>
          </template>
        </el-switch>

        <button class="mobile-menu-toggle d-lg-none" @click="toggleMobileMenu">
          <span v-if="!mobileMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <div class="nav-tabs-container d-none d-lg-block w-100">
      <div class="container-fluid">
        <div class="nav-tabs w-100">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav-tab"
            :class="{ active: activeTab === tab.id }"
            @click="setActiveTab(tab.id)"
          >
            <span class="tab-icon"></span>
            <span class="tab-label">{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-menu d-lg-none w-100">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="mobile-menu-item "
          :class="{ active: activeTab === tab.id }"
          @click="setActiveTab(tab.id)"
        >
          <span class="tab-icon"></span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 10000;
}

.container-fluid {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Driver Info Section */
.driver-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.driver-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.driver-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.driver-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

.driver-phone {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
}

/* Right Section */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  font-size: 24px;
  line-height: 1;
  transition: color 0.2s;
}

.menu-btn:hover {
  color: #1f2937;
}

.edit-driver-btn {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-driver-btn:hover {
  background-color: #2563eb;
}

.mobile-menu-toggle {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #1f2937;
  font-size: 24px;
  line-height: 1;
}

/* Theme Switch Styles */
.theme-switch {
  --el-switch-on-color: #1f2937;
  --el-switch-off-color: #f59e0b;
}

.theme-switch :deep(.el-switch__action) {
  background-color: #ffffff;
}

.nav-tabs {
  display: flex;
  gap: 0;
  padding: 0;
}

.nav-tab {
  background: none;
  border: none;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
  position: relative;
}

.nav-tab:hover {
  color: #6b7280;
  background-color: #f9fafb;
}

.nav-tab.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-icon {
  font-size: 16px;
}

.tab-label {
  white-space: nowrap;
}

/* Mobile Menu */
.mobile-menu {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 8px 0;
}

.mobile-menu-item {
  width: 100%;
  background: none;
  border: none;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s;
}

.mobile-menu-item:hover {
  background-color: #f3f4f6;
}

.mobile-menu-item.active {
  color: #3b82f6;
  background-color: #eff6ff;
}

.mobile-menu-item .tab-icon {
  font-size: 20px;
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Responsive Adjustments */
@media (max-width: 991px) {
  .container-fluid {
    padding: 12px 16px;
  }

  .driver-avatar img {
    width: 40px;
    height: 40px;
  }

  .driver-name {
    font-size: 16px;
  }

  .driver-phone {
    font-size: 12px;
  }

  .edit-driver-btn {
    padding: 6px 16px;
    font-size: 13px;
  }
}

@media (max-width: 576px) {
  .driver-name {
    font-size: 15px;
  }

  .driver-phone {
    display: none;
  }

  .edit-driver-btn {
    display: none;
  }
}

/* Dark Mode Styles */
.navbar.dark {
  background-color: #1f2937;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.navbar.dark .driver-name {
  color: #f9fafb;
}

.navbar.dark .driver-phone {
  color: #9ca3af;
}

.navbar.dark .menu-btn,
.navbar.dark .mobile-menu-toggle {
  color: #9ca3af;
}

.navbar.dark .menu-btn:hover,
.navbar.dark .mobile-menu-toggle:hover {
  color: #f9fafb;
}

.navbar.dark .edit-driver-btn {
  background-color: #3b82f6;
}

.navbar.dark .edit-driver-btn:hover {
  background-color: #2563eb;
}

.navbar.dark .theme-switch {
  --el-switch-on-color: #60a5fa;
}

.navbar.dark .nav-tabs-container {
  border-top-color: #374151;
}

.navbar.dark .nav-tab {
  color: #9ca3af;
}

.navbar.dark .nav-tab:hover {
  color: #d1d5db;
  background-color: #374151;
}

.navbar.dark .nav-tab.active {
  color: #60a5fa;
  border-bottom-color: #60a5fa;
}

.navbar.dark .mobile-menu {
  background-color: #1f2937;
  border-top-color: #374151;
}

.navbar.dark .mobile-menu-item {
  color: #9ca3af;
}

.navbar.dark .mobile-menu-item:hover {
  background-color: #374151;
  color: #d1d5db;
}

.navbar.dark .mobile-menu-item.active {
  color: #60a5fa;
  background-color: #1e3a5f;
}
</style>
