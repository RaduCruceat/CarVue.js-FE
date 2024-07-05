<template>
    <main>
        <h1 style="text-align:center">Editeaza masina</h1>
        <Button label="Submit" @click="goToCars" />
    </main>
</template>

<script>
    import Button from 'primevue/button';

    export default {
        name: 'EditCars',
        components: {
            Button,
        },
        methods: {
            goToCars() {
                this.$router.push({
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
            }
        }
    };
</script>