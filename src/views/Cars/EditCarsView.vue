<template>
    <main>
        <h1 style="text-align:center">Editeaza masina</h1>
        <form @submit.prevent="handleSubmit" class="car-form" v-if="currentCar">
            <div class="form-group">
                <label for="marca">Marca:</label>
                <input type="text" id="marca" v-model="currentCar.marca" :class="{ 'is-invalid': marcaError }" />
                <span v-if="marcaError" class="error-message">Campul este obligatoriu.</span>
            </div>
            <div class="form-group">
                <label for="model">Model:</label>
                <input type="text" id="model" v-model="currentCar.model" :class="{ 'is-invalid': modelError }" />
                <span v-if="modelError" class="error-message">Campul este obligatoriu.</span>
            </div>
            <div class="form-group">
                <label for="an">An:</label>
                <input type="number" id="an" v-model="currentCar.an" :class="{ 'is-invalid': anError }" />
                <span v-if="anError" class="error-message">{{ anErrorMessage }}</span>
            </div>
            <div class="form-group">
                <label for="motor">Motor:</label>
                <input type="number" id="motor" v-model="currentCar.motor" :class="{ 'is-invalid': motorError }" />
                <span v-if="motorError" class="error-message">{{ motorErrorMessage }}</span>
            </div>
            <Button label="Submit" type="submit" class="submit-button" />
        </form>
    </main>
</template>

<script>
    import Button from 'primevue/button';
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useCarStore } from '../../carStore';

    export default {
        name: 'EditCars',
        components: {
            Button,
        },
        setup() {
            const router = useRouter();
            const route = useRoute();
            const { cars, updateCar } = useCarStore();

            const currentCar = ref(null);

            const marcaError = ref(false);
            const modelError = ref(false);
            const anError = ref(false);
            const motorError = ref(false);
            const anErrorMessage = ref('');
            const motorErrorMessage = ref('');

            onMounted(() => {
                const carId = parseInt(route.params.id);
                console.log('Car ID:', carId); 
                const carToEdit = cars.value.find(car => car.id === carId);
                console.log('Car to edit:', carToEdit); 
                if (carToEdit) {
                    currentCar.value = { ...carToEdit };
                } else {
                    console.log('Car not found'); 
                    router.push({ name: 'Cars' });
                }
            });

            const validateForm = () => {
                let isValid = true;

                marcaError.value = !currentCar.value.marca;
                modelError.value = !currentCar.value.model;
                anError.value = !currentCar.value.an || currentCar.value.an < 1900 || currentCar.value.an > 2024;
                motorError.value = !currentCar.value.motor || currentCar.value.motor <= 0;

                if (anError.value) {
                    anErrorMessage.value = !currentCar.value.an
                        ? 'Campul este obligatoriu.'
                        : 'Anul trebuie sa fie intre 1900 si 2024.';
                    isValid = false;
                } else {
                    anErrorMessage.value = '';
                }

                if (motorError.value) {
                    motorErrorMessage.value = !currentCar.value.motor
                        ? 'Campul este obligatoriu.'
                        : 'Motorul trebuie sa fie mai mare decat 0.';
                    isValid = false;
                } else {
                    motorErrorMessage.value = '';
                }

                return isValid && !marcaError.value && !modelError.value;
            };

            const handleSubmit = () => {
                if (validateForm()) {
                    updateCar(currentCar.value);
                    goToCars();
                }
            };

            const goToCars = () => {
                router.push({
                    name: 'Cars',
                    state: {
                        showMessage: true,
                        toastMessage: {
                            severity: 'success',
                            summary: 'Succes!',
                            detail: 'Masina a fost editata.'
                        }
                    }
                });
            };

            return {
                currentCar,
                marcaError,
                modelError,
                anError,
                motorError,
                anErrorMessage,
                motorErrorMessage,
                handleSubmit,
                goToCars,
            };
        },
    };
</script>

<style>
    .error-message {
        color: red;
        font-size: 0.8em;
    }

    .is-invalid {
        border-color: red;
    }
</style>