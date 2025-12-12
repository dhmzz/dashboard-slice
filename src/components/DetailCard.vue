<script setup lang="ts">
import { ref } from 'vue'
import detailData from '../store/data-json/details.json'
import { useTheme } from '../composables/useTheme'

const details = ref(detailData)
const { theme } = useTheme()
</script>

<template>
    <el-card shadow="always" class="detail-card" :class="theme">
        <template #header>
            <div class="card-header">
                <h3>Details</h3>
            </div>
        </template>

        <div class="detail-content">
            <div class="detail-item">
                <span class="label">Name</span>
                <span class="value">{{ details.name }}</span>
            </div>

            <div class="detail-item">
                <span class="label">Phone Number</span>
                <span class="value">{{ details.phoneNumber }}</span>
            </div>

            <div class="detail-item">
                <span class="label">Email</span>
                <span class="value">{{ details.email }}</span>
            </div>

            <div class="detail-item">
                <span class="label">Fleet Group</span>
                <span class="value">{{ details.fleetGroup }}</span>
            </div>

            <div class="detail-item">
                <span class="label">Employment</span>
                <span class="value">{{ details.employment }}</span>
            </div>

            <div class="detail-item">
                <span class="label">Working Hour</span>
                <span class="value">{{ details.workingHour }}</span>
            </div>

            <div class="detail-item">
                <span class="label">Vehicle</span>
                <span class="value vehicle-link">{{ details.vehicle }}</span>
            </div>

            <div class="detail-item">
                <span class="label">Status</span>
                <span class="value">
                    <el-tag 
                        type="success" 
                        effect="light" 
                        round
                        class="status-tag"
                    >
                        {{ details.status }}
                    </el-tag>
                </span>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.detail-card {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
}

.card-header h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
}

.detail-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
}

.label {
    font-size: 14px;
    color: #9ca3af;
    font-weight: 400;
}

.value {
    font-size: 14px;
    color: #1f2937;
    font-weight: 500;
    text-align: right;
}

.vehicle-link {
    color: #3b82f6;
    cursor: pointer;
}

.vehicle-link:hover {
    text-decoration: underline;
}

.status-tag {
    font-weight: 500;
    padding: 4px 12px;
    font-size: 14px;
}

:deep(.el-card__header) {
    padding: 20px 24px;
    border-bottom: 1px solid #f3f4f6;
}

:deep(.el-card__body) {
    padding: 24px;
}

/* Dark Mode Styles */
.detail-card.dark {
    background-color: #1f2937;
    border-color: #374151;
}

.detail-card.dark .card-header h3 {
    color: #f9fafb;
}

.detail-card.dark .label {
    color: #9ca3af;
}

.detail-card.dark .value {
    color: #e5e7eb;
}

.detail-card.dark .vehicle-link {
    color: #60a5fa;
}

.detail-card.dark :deep(.el-card__header) {
    border-bottom-color: #374151;
}
</style>