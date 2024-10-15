// ThemeToggle.vue
<template>
    <div>
        <button @click="toggleTheme" class="theme-toggle">
            <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import "@fortawesome/fontawesome-free/css/all.css";

export default defineComponent({
    name: 'ThemeToggle',
    setup() {
        const theme = ref(localStorage.getItem('theme') || 'light');
        const isDarkMode = ref(theme.value === 'dark');

        const toggleTheme = () => {
            theme.value = theme.value === 'light' ? 'dark' : 'light';
            isDarkMode.value = theme.value === 'dark';
            localStorage.setItem('theme', theme.value);
            document.body.className = theme.value + '-mode';
        };

        onMounted(() => {
            document.body.className = theme.value + '-mode';
            isDarkMode.value = theme.value === 'dark';
        });

        return {
            toggleTheme,
            isDarkMode
        };
    }
});
</script>

<style scoped>
 /* @import '../assets/main.css'; */


.theme-toggle {
    padding: 9px 16px;
    background-color:#007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.theme-toggle i {
    margin-right: 8px;
}


</style>
