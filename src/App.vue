<!-- App.vue -->
<template>
    <Toast />
    <header>
        <Menubar :model="items">
            <template #start>

                <span class="p-menubar-button"></span>
            </template>
        </Menubar>
    </header>
    <RouterView />
    <Toast />
</template>

<script setup>
    import { ref } from 'vue';
    import Menubar from 'primevue/menubar';
    import { useRouter } from 'vue-router';
    import { provideCarStore } from './carStore';
 
    
    const items = ref([
        {
            label: 'Home ',
            command: () => { router.push('/') }
        },
        {
            label: ' Cars ',
            command: () => { router.push('/Cars') }
        },
             
    ]);
    
   
    const router = useRouter();
    provideCarStore();
</script>

<style scoped>
    .p-menubar-button {
        font-weight: bold;
        font-size: 6.25rem;
        margin-right: 1rem;
    }
</style>
