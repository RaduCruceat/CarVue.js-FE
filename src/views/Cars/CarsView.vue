<template>
    <Toast />
    <main>
        <h1 style="text-align:center">Pagina de masini</h1>
        <table border="1" class="table table-bordered" style="width:80%; margin: 0 auto;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Model</th>
                    <th>An</th>
                    <th>Motor</th>
                    <th>Actiune</th>
                </tr>
            </thead>
            <tbody>
                <!-- Add table rows here if needed -->
            </tbody>
        </table>
    </main>
    <div style="width:80%; margin: 0 auto;">
        <Button label="Adauga Masina" @click="goToCreateCars"  />    
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import Button from 'primevue/button';
    import { useToast } from 'primevue/usetoast';
    import { useRouter, useRoute } from 'vue-router';
    

    export default {
        name: 'Cars',
        components: {
            Button,
        },
        setup() {
          
            const cars = ref([]);
            const toast = useToast();
            const router = useRouter();
            const route = useRoute();
            
            onMounted(() => {
                if (history.state.showMessage) { 
                    toast.add({
                        severity: 'warn', summary: 'Warn Message',
                        detail: 'Message Content', group: 'bl', life: 3000
                    });
                }
            });

            const goToCreateCars = () => {
                router.push('/AddCars');            
            };

            return {
                cars,
                goToCreateCars
            };
        }
    };
</script>
