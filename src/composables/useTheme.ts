import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

// Initialize theme from localStorage or default to light
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  
  if (savedTheme) {
    theme.value = savedTheme
  } else {
    // Default to light mode
    theme.value = 'light'
  }
  
  // Apply theme to document
  applyTheme(theme.value)
}

// Apply theme class to document
const applyTheme = (newTheme: Theme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark-mode')
    document.documentElement.classList.remove('light-mode')
  } else {
    document.documentElement.classList.add('light-mode')
    document.documentElement.classList.remove('dark-mode')
  }
}

// Watch for theme changes and persist to localStorage
watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
})

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }

  const isDark = () => theme.value === 'dark'

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark,
    initTheme
  }
}
