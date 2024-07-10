<template>
    <main>
        <h1 style="text-align:center">Adauga o masina</h1>
        <form @submit.prevent="handleSubmit" class="car-form">
            <div class="form-group">
                <label for="marca">Marca:</label>
                <input type="text" id="marca" v-model="marca" :class="{ 'is-invalid': marcaError }" />
                <span v-if="marcaError" class="error-message">Campul este obligatoriu.</span>
            </div>
            <div class="form-group">
                <label for="model">Model:</label>
                <input type="text" id="model" v-model="model" :class="{ 'is-invalid': modelError }" />
                <span v-if="modelError" class="error-message">Campul este obligatoriu.</span>
            </div>
            <div class="form-group">
                <label for="an">An:</label>
                <input type="number" id="an" v-model="an" :class="{ 'is-invalid': anError }" />
                <span v-if="anError" class="error-message">{{ anErrorMessage }}</span>
            </div>
            <div class="form-group">
                <label for="motor">Motor:</label>
                <input type="number" id="motor" v-model="motor" :class="{ 'is-invalid': motorError }" />
                <span v-if="motorError" class="error-message">{{ motorErrorMessage }}</span>
            </div>
            <Button label="Submit" type="submit" class="submit-button" />
        </form>
    </main>
</template>

<script>
    import Button from 'primevue/button';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useCarStore } from '../../carStore';

    export default {
        name: 'AddCars',
        components: {
            Button,
        },
        setup() {
            const router = useRouter();
            const { cars, addCar } = useCarStore();
            const marca = ref('');
            const model = ref('');
            const an = ref('');
            const motor = ref('');

            const marcaError = ref(false);
            const modelError = ref(false);
            const anError = ref(false);
            const motorError = ref(false);
            const anErrorMessage = ref('');
            const motorErrorMessage = ref('');

            const validateForm = () => {
                let isValid = true;

                marcaError.value = !marca.value;
                modelError.value = !model.value;
                anError.value = !an.value || an.value < 1900 || an.value > 2024;
                motorError.value = !motor.value || motor.value <= 0;

                if (anError.value) {
                    anErrorMessage.value = !an.value
                        ? 'Campul este obligatoriu.'
                        : 'Anul trebuie sa fie intre 1900 si 2024.';
                    isValid = false;
                }

                if (motorError.value) {
                    motorErrorMessage.value = !motor.value
                        ? 'Campul este obligatoriu.'
                        : 'Motorul trebuie sa fie mai mare decat 0.';
                    isValid = false;
                }

                return isValid && !marcaError.value && !modelError.value;
            };

            const handleSubmit = () => {
                if (validateForm()) {
                    const newCar = {
                        id: cars.value.length ? Math.max(...cars.value.map(car => car.id)) + 1 : 1,
                        marca: marca.value,
                        model: model.value,
                        an: an.value,
                        motor: motor.value,
                    };
                    addCar(newCar);
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
                            detail: 'Masina a fost adaugata.'
                        }
                    }
                });
            };

            return {
                marca, model, an, motor,
                marcaError, modelError, anError, motorError,
                anErrorMessage, motorErrorMessage,
                handleSubmit,
                goToCars,
            };
        }
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
