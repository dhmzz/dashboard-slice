<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElProgress } from 'element-plus'
import driverBehaviorData from '../store/data-json/driver-behavior.json'
import { useTheme } from '../composables/useTheme'

const data = ref(driverBehaviorData)
const { theme } = useTheme()

const changeType = computed(() => {
  return data.value.change < 0 ? 'decrease' : 'increase'
})

const changeIcon = computed(() => {
  return data.value.change < 0 ? '↓' : '↑'
})
</script>

<template>
    <el-card shadow="always" class="driver-behavior-card" :class="theme">
        <template #header>
            <div class="card-header">
                <h3>{{ data.title }}</h3>
                <span class="see-more">See More</span>
            </div>
        </template>

        <div class="behavior-content">
            <!-- Trips Info -->
            <div class="trips-info">
                <span class="trips-count">{{ data.trips }} Trips</span>
            </div>

            <!-- Score Section -->
            <div class="score-section">
                <div class="score-container">
                    <h2 class="score">{{ data.score }}%</h2>
                    <div class="change-badge" :class="changeType">
                        <span class="change-icon">{{ changeIcon }}</span>
                        <span class="change-value">{{ Math.abs(data.change) }}%</span>
                    </div>
                </div>
                <span class="change-label">{{ data.changeLabel }}</span>
            </div>

            <!-- Progress Bar -->
            <div class="progress-bar-container">
                <el-progress 
                    :percentage="data.progressBar.value" 
                    :show-text="false"
                    :color="data.progressBar.color"
                    :stroke-width="50"
                />
            </div>

            <!-- Metrics Grid -->
            <div class="metrics-grid">
                <div 
                    v-for="(metric, index) in data.metrics" 
                    :key="index"
                    class="metric-item"
                >
                    <span class="metric-value">{{ metric.value }}</span>
                    <span class="metric-label">{{ metric.label }}</span>
                </div>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.driver-behavior-card {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #6b7280;
}

.see-more {
    font-size: 14px;
    color: #9ca3af;
    cursor: pointer;
    font-weight: 400;
}

.see-more:hover {
    color: #6b7280;
}

.behavior-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.trips-info {
    margin-bottom: 4px;
}

.trips-count {
    font-size: 14px;
    color: #9ca3af;
    font-weight: 400;
}

.score-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.score-container {
    display: flex;
    align-items: center;
    gap: 12px;
}

.score {
    font-size: 48px;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
    line-height: 1;
}

.change-badge {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
}

.change-badge.decrease {
    background-color: #fee2e2;
    color: #ef4444;
}

.change-badge.increase {
    background-color: #dcfce7;
    color: #10b981;
}

.change-icon {
    font-size: 12px;
}

.change-label {
    font-size: 13px;
    color: #9ca3af;
    font-weight: 400;
}

.progress-bar-container {
    margin: 8px 0;
}

:deep(.el-progress-bar__outer) {
    background-color: #e5e7eb;
    border-radius: 10px;
}

:deep(.el-progress-bar__inner) {
    border-radius: 10px;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 32px;
    margin-top: 8px;
}

.metric-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.metric-value {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    min-width: 28px;
}

.metric-label {
    font-size: 14px;
    color: #9ca3af;
    font-weight: 400;
}

:deep(.el-card__header) {
    padding: 20px 24px;
    border-bottom: 1px solid #f3f4f6;
}

:deep(.el-card__body) {
    padding: 24px;
}

/* Dark Mode Styles */
.driver-behavior-card.dark {
    background-color: #1f2937;
    border-color: #374151;
}

.driver-behavior-card.dark .card-header h3 {
    color: #e5e7eb;
}

.driver-behavior-card.dark .see-more {
    color: #9ca3af;
}

.driver-behavior-card.dark .see-more:hover {
    color: #d1d5db;
}

.driver-behavior-card.dark .trips-count {
    color: #9ca3af;
}

.driver-behavior-card.dark .score {
    color: #f9fafb;
}

.driver-behavior-card.dark .change-label {
    color: #9ca3af;
}

.driver-behavior-card.dark .metric-value {
    color: #e5e7eb;
}

.driver-behavior-card.dark .metric-label {
    color: #9ca3af;
}

.driver-behavior-card.dark :deep(.el-card__header) {
    border-bottom-color: #374151;
}

.driver-behavior-card.dark :deep(.el-progress-bar__outer) {
    background-color: #374151;
}
</style>

