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
        <Button label="Adauga Masina" @click="goToCreateCars" />
       
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import Button from 'primevue/button';
    import { useToast } from 'primevue/usetoast';
    import { useRouter, useRoute } from 'vue-router';
    import Toast from 'primevue/toast';
    import { useConfirm } from "primevue/useconfirm";

    export default {
        name: 'Cars',
        components: {
            Button,
            Toast,
        },
        setup() {
          
            const cars = ref([]);
            const toast = useToast();
            const router = useRouter();
            const route = useRoute();
            const confirm = useConfirm();
            
            onMounted(() => {
            const state = history.state;
            if (state && state.showMessage && state.toastMessage) {
                showToast(state.toastMessage);
            }
        });

            const goToCreateCars = () => {
                router.push('/AddCars');            
            };
            const showToast = (message) => {
            toast.add({
                severity: message.severity || 'info',
                summary: message.summary || 'Message',
                detail: message.detail || 'Message Content',
                life: 3000
            });
        };
          

            return {
                cars,
                goToCreateCars,
                 showToast 
            };
        }
    };
</script>
