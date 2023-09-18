<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Debt</th>
                <th scope="col">IBAN</th>
            </tr>
        </thead>
        <tbody v-for="(person, index) in persons" :key="index">
            <tr>
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ person.name }}</td>
                <td>{{ Math.round(person.debt *10)/10}}</td>
                <td>{{ person.iban }}</td>
            </tr>
        </tbody>
    </table>
</template>


<script setup>
import { watch, ref, onMounted } from 'vue';
import store from '../store'

const persons = ref([]);



watch(store.state.persons, (value) => {
    persons.value = [];
    value.forEach(item => {
        let debts = [];
        let sumOfDebts = 0;
        if (item.items) {
            let itemObj = store.getters.itemsOfAnUser(item.items);
            itemObj.forEach(element => {
                debts.push(element.itemPrice / element.usersInvolved)
            })

            if (debts.length) {
                sumOfDebts = debts.reduce((accumulator, currentValue) => accumulator + currentValue);
            }
        }
        persons.value.push({ name: item.name, id: item.id, debt: sumOfDebts, iban: item.iban })
    })
});
</script>