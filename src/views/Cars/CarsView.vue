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
                <tr v-for="car in cars" :key="car.id">
                    <td>{{ car.id }}</td>
                    <td>{{ car.marca }}</td>
                    <td>{{ car.model }}</td>
                    <td>{{ car.an }}</td>
                    <td>{{ car.motor }}</td>
                    <td>
                        <Button label="Edit" @click="goToEditCars(car.id)" />
                        <Button label="Delete" @click="showDeleteToast(car.id)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
    <div style="width:80%; margin: 0 auto;">
        <Button label="Adauga Masina" @click="goToCreateCars" />      
        <Select v-model="selectedAction"
                  :options="actions"
                  optionLabel="name"
                  placeholder="Selecteaza o Actiune"
                  @change="handleActionChange"
                  style="width: 200px;" />  
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
    import Dropdown from 'primevue/dropdown';
    import Select from 'primevue/select';
    import { useCarStore } from '../../carStore'; 

    export default {
        name: 'Cars',
        components: {
            Button,
            Toast,
            Dropdown,
            Select
        },

        setup() {
            const { cars, removeCar } = useCarStore();
            const selectedAction = ref(null);
            const toast = useToast();
            const router = useRouter();
            const route = useRoute();
            const confirm = useConfirm();
            const visible = ref(false);
            const actions = [
                { name: 'Sterge Masina', value: 'delete' },
                { name: 'Editeaza Masina', value: 'edit' },
            ];

            const handleActionChange = () => {
                if (selectedAction.value) {
                    if (selectedAction.value.value === 'delete') {
                        showDeleteToast();
                    } else if (selectedAction.value.value === 'edit') {
                        goToEditCars();
                    }
                    selectedAction.value = null;
                }
            };

            onMounted(() => {
                const state = history.state;
                if (state && state.showMessage && state.toastMessage) {
                    showSuccessToast(state.toastMessage);

                    const newState = { ...state };
                    delete newState.showMessage;
                    delete newState.toastMessage;
                    history.replaceState(newState, '');
                }
            });

            const goToCreateCars = () => {
                router.push('/AddCars');
            };

            const goToEditCars = (carId) => {
                router.push(`/EditCars/${carId}`);
            };

            const showSuccessToast = (message) => {
                toast.add({
                    severity: message.severity || 'info',
                    summary: message.summary || 'Message',
                    detail: message.detail || 'Message Content',
                    life: 3000
                });
            };

            const carIdToDelete = ref(null);

            const showDeleteToast = (carId) => {
                if (!visible.value) {
                    carIdToDelete.value = carId;
                    toast.add({ severity: 'error', summary: `Stergeti masina cu id-ul ${carId}?`, group: 'bc' });
                    visible.value = true;
                }
            };

            const onDeleteReply = () => {
                removeCar(carIdToDelete.value);
                toast.add({
                    severity: 'success',
                    summary: 'Succes!',
                    detail: 'Masina a fost stearsa.',
                    life: 3000
                });
                toast.removeGroup('bc');
                visible.value = false;
            };

            const onDeleteClose = () => {
                visible.value = false;
            }

            return {
                cars,
                goToCreateCars,
                goToEditCars,
                showDeleteToast,
                onDeleteReply,
                onDeleteClose,
                showSuccessToast,
                selectedAction,
                actions,
                handleActionChange,
            };
        }
    };
</script>
