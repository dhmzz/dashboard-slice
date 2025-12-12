<script setup lang="ts">
import { ref } from 'vue'
import activitiesData from '../store/data-json/activities.json'
import { useTheme } from '../composables/useTheme'

const data = ref(activitiesData)
const { theme } = useTheme()

const getColorClass = (color: string) => {
  return `dot-${color}`
}
</script>

<template>
    <el-card shadow="always" class="activities-card" :class="theme">
        <template #header>
            <div class="card-header">
                <h3>{{ data.title }}</h3>
            </div>
        </template>

        <div class="activities-content">
            <div 
                v-for="(activity, index) in data.activities" 
                :key="activity.id"
                class="activity-item"
                :class="{ 'last-item': index === data.activities.length - 1 }"
            >
                <!-- Timeline Dot -->
                <div class="timeline-dot-container">
                    <div class="timeline-dot" :class="getColorClass(activity.color)"></div>
                    <div v-if="index !== data.activities.length - 1" class="timeline-line"></div>
                </div>

                <!-- Activity Content -->
                <div class="activity-content">
                    <div class="activity-header">
                        <h4 class="activity-title">{{ activity.title }}</h4>
                        <span class="activity-timestamp">{{ activity.timestamp }}</span>
                    </div>
                    <p class="activity-description">{{ activity.description }}</p>
                </div>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.activities-card {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
}

.card-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #6b7280;
}

.activities-content {
    display: flex;
    flex-direction: column;
}

.activity-item {
    display: flex;
    gap: 16px;
    position: relative;
}

.activity-item:not(.last-item) {
    margin-bottom: 24px;
}

.timeline-dot-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.timeline-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
}

.dot-red {
    background-color: #ef4444;
}

.dot-blue {
    background-color: #3b82f6;
}

.dot-orange {
    background-color: #f59e0b;
}

.dot-green {
    background-color: #10b981;
}

.dot-purple {
    background-color: #a855f7;
}

.timeline-line {
    width: 2px;
    flex-grow: 1;
    background-color: #e5e7eb;
    margin-top: 8px;
    min-height: 40px;
}

.activity-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.activity-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
}

.activity-title {
    margin: 0;
    font-size: 15px;
    font-weight: 500;
    color: #6b7280;
    line-height: 1.4;
}

.activity-timestamp {
    font-size: 13px;
    color: #9ca3af;
    white-space: nowrap;
    font-weight: 400;
}

.activity-description {
    margin: 0;
    font-size: 14px;
    color: #9ca3af;
    line-height: 1.5;
}

:deep(.el-card__header) {
    padding: 20px 24px;
    border-bottom: 1px solid #f3f4f6;
}

:deep(.el-card__body) {
    padding: 24px;
}

/* Dark Mode Styles */
.activities-card.dark {
    background-color: #1f2937;
    border-color: #374151;
}

.activities-card.dark .card-header h3 {
    color: #e5e7eb;
}

.activities-card.dark .activity-title {
    color: #d1d5db;
}

.activities-card.dark .activity-timestamp {
    color: #9ca3af;
}

.activities-card.dark .activity-description {
    color: #9ca3af;
}

.activities-card.dark .timeline-line {
    background-color: #374151;
}

.activities-card.dark :deep(.el-card__header) {
    border-bottom-color: #374151;
}
</style>

