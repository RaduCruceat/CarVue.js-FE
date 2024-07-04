<template>
    <main>
        <h1 style="text-align:center">Car Page</h1>
        <table  border="1" class="table table-bordered" style="width:80%; margin: 0 auto;">
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
        </table>
        <div class="card flex justify-center">
            <Button label="Adauga Masina" />
            <Checkbox v-model="checked" :binary="true" />
            <Knob v-model="value" />
        </div>
      
    </main>
</template>

<script>
    import { ref } from 'vue';
    import Button from 'primevue/button';
    import Checkbox from 'primevue/checkbox';
    import Knob from 'primevue/knob';

    export default {
        name: 'Cars',
        components: {
            Button,
            Checkbox,
            Knob
        },
        setup() {
            const checked = ref(false);
            const value = ref(0);
            const cars = ref([]);

            return {
                checked,
                value,
                cars
            };
        },
        mounted() {
            console.log("test");
        }
    };
</script>