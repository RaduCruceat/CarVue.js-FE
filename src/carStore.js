// src/carStore.js
import { ref, provide, inject } from 'vue';

const CAR_STORE_SYMBOL = Symbol();

export function provideCarStore() {
    const cars = ref([
        { id: 1, marca: "Toyota", model: "Corolla", an: 2022, motor: 1800 },
        { id: 2, marca: "Honda", model: "Civic", an: 2021, motor: 1500 },
        { id: 3, marca: "Ford", model: "Focus", an: 2023, motor: 1600 },
        { id: 4, marca: "Volkswagen", model: "Golf", an: 2022, motor: 1400 },
        { id: 5, marca: "BMW", model: "3 Series", an: 2023, motor: 2000 }
    ]);

    const addCar = (car) => {
        cars.value.push(car);
    };


    const removeCar = (id) => {
        const index = cars.value.findIndex(car => car.id === id);
        if (index !== -1) {
            cars.value.splice(index, 1);
        }
    };

    const updateCar = (updatedCar) => {
        const index = cars.value.findIndex(car => car.id === updatedCar.id);
        if (index !== -1) {
            cars.value[index] = updatedCar;
        }
    };

    provide(CAR_STORE_SYMBOL, {
        cars,
        addCar,
        removeCar,
        updateCar
    });
}

export function useCarStore() {
    const carStore = inject(CAR_STORE_SYMBOL);
    if (!carStore) {
        throw new Error('Car store not provided');
    }
    return carStore;
}