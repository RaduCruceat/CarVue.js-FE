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
        <Button label="Sterge Masina" severity="danger" @click="showDeleteToast" />

    </div>
    <div>
        <Toast position="bottom-center" group="bc" @close="onDeleteClose">
            <template #message="slotProps">
                <div class=" items-start flex-auto">
                    <div class="font-medium text-lg my-4">{{ slotProps.message.summary }}</div>
                    <Button size="small" label="Da" severity="danger" @click="onDeleteReply()"></Button>
                </div>
            </template>
        </Toast>
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
            const visible = ref(false);
            
            onMounted(() => {
            const state = history.state;
            if (state && state.showMessage && state.toastMessage) {
                showSuccessToast(state.toastMessage);
            }
             });

            const goToCreateCars = () => {
                router.push('/AddCars');            
            };

            const showSuccessToast = (message) => {
            toast.add({
                severity: message.severity || 'info',
                summary: message.summary || 'Message',
                detail: message.detail || 'Message Content',
                life: 3000
            });
        };


        const showDeleteToast = () => {
    if (!visible.value) {
        toast.add({ severity: 'error', summary: 'Stergeti masina X cu id-ul X?', group: 'bc' });
        visible.value = true;
    } 
};

const onDeleteReply = () => {
    toast.removeGroup('bc');
    visible.value = false;
}

const onDeleteClose = () => {
    visible.value = false;
}
          

            return {
                cars,
                goToCreateCars,
                showDeleteToast,
                onDeleteReply,
                onDeleteClose,
                 showSuccessToast 
            };
        }
    };
</script>
