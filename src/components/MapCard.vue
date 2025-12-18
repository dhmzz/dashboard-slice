<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import mapLocationData from '../store/data-json/map-location.json'
import { useTheme } from '../composables/useTheme'
import axios from 'axios'
import { ElMessage } from 'element-plus'

interface datas {
    latitude: number,
    longitude: number,
    timestamp: string
}

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let tileLayer: L.TileLayer | null = null
let markersLayer: L.LayerGroup | null = null

const data = ref(mapLocationData)
const dataLatTide = ref<datas[]>([]);

const { theme } = useTheme()

// Custom car icon HTML
const createCarIcon = (lat?:string, long?:string) => {

  return L.divIcon({
    html: `
    <div style="width: 28px; height: 60px; position: relative; transform: rotate(45deg); filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));">
        <div style="height: 18px; background: #138a4c; border-radius: 6px 6px 2px 2px; position: relative;">
            <span style="position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 25px; height: 8px; background: black; border-radius: 2px; display: block;"></span>
        </div>
        <div style="height: 42px; background: #16a34a; border-radius: 0 0 8px 8px; position: relative;">
            <span style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 16px; height: 1.5px; background: rgba(255,255,255,0.4); display: block;"></span>
        </div>
    </div>
    `,
    className: 'custom-car-icon',
    iconSize: [40, 60],
    iconAnchor: [20, 60]
  })
}

const fetchData = async () => {
  try {
    const response = await axios.get('https://treffix-tracking-test.vercel.app/track')
    dataLatTide.value = [response.data];
    
  } catch (error) {
    ElMessage.error('Failed to fetch map location data.')
    console.error('Error fetching map location data:', error)
  }
}

onMounted(async () => {
    if (mapContainer.value) {
      map = L.map(mapContainer.value, {
        zoomControl: true,
        attributionControl: false
      }).setView([data.value.coordinates.lat, data.value.coordinates.lng], 14)

      
    // Initialize map

    // Add tile layer based on theme
    const tileUrl = theme.value === 'dark' 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    
    tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
    }).addTo(map)

    
    render();
    
  }
})

const render = async() => {
    await fetchData();
    setTimeout(() => {
        if (!map) return;

        // Remove existing markers layer if it exists
        if (markersLayer) {
            map.removeLayer(markersLayer)
        }

        // Create new layer group
        markersLayer = L.layerGroup()
    
        const carIcon = createCarIcon();
        if(dataLatTide.value.length > 0){
            dataLatTide.value.forEach(item => {
                L.marker([item.latitude, item.longitude], {
                    icon: carIcon
                }).addTo(markersLayer!)
            })
        }
        map.addLayer(markersLayer)

        render();
    }, 3000);
}
 



// Watch theme changes and update map tiles
watch(theme, (newTheme) => {
  if (map && tileLayer) {
    map.removeLayer(tileLayer)
    
    const tileUrl = newTheme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    
    tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
    }).addTo(map)
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<template>
    <el-card shadow="always" class="map-card" :class="theme">
        <template #header>
            <div class="card-header">
                <h3>{{ data.title }}</h3>
                <span class="see-more">See More</span>
            </div>
        </template>

        <div class="map-content">
            <!-- Map Container -->
            <div ref="mapContainer" class="map-container"></div>

            <!-- Location Info -->
            <div class="location-info">
                <div class="address">
                    {{ data.address }}
                </div>
                <div class="last-updated">
                    {{ data.lastUpdated }}
                </div>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.map-card {
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

.map-content {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.map-container {
    width: 100%;
    height: 280px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f3f4f6;
}

.location-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 0 0;
}

.address {
    font-size: 14px;
    color: #6b7280;
    font-weight: 400;
}

.last-updated {
    font-size: 13px;
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

/* Leaflet custom styles */
:deep(.leaflet-container) {
    font-family: inherit;
}

:deep(.custom-car-icon) {
    background: transparent !important;
    border: none !important;
}

/* Remove Leaflet attribution */
:deep(.leaflet-control-attribution) {
    display: none;
}

/* Custom zoom control styling */
:deep(.leaflet-control-zoom) {
    border: none !important;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

:deep(.leaflet-control-zoom a) {
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    color: #374151;
    border: none !important;
}

:deep(.leaflet-control-zoom a:hover) {
    background-color: #f3f4f6;
}

/* Dark Mode Styles */
.map-card.dark {
    background-color: #1f2937;
    border-color: #374151;
}

.map-card.dark .card-header h3 {
    color: #e5e7eb;
}

.map-card.dark .see-more {
    color: #9ca3af;
}

.map-card.dark .see-more:hover {
    color: #d1d5db;
}

.map-card.dark .address {
    color: #d1d5db;
}

.map-card.dark .last-updated {
    color: #9ca3af;
}

.map-card.dark :deep(.el-card__header) {
    border-bottom-color: #374151;
}

.map-card.dark .map-container {
    background-color: #111827;
}
</style>
