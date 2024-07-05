<template>
    <main>
        <h1 style="text-align:center">Adauga o masina</h1>
        <Button label="Submit" @click="goToCars" />
    </main>
</template>

<script>
    import Button from 'primevue/button';

    export default {
        name: 'AddCars',
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
                            summary: 'Success',
                            detail: 'Masina a fost adaugata cu succes!'
                        }
                    }
                });
            }
        }
    };
</script>