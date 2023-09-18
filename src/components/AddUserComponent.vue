<template>
    <div class="row">
        <h1>Split Pay</h1>
        <label for="newPerson" class="form-label d-flex justify-content-left" >Add person</label>
        <div class="input-group mb-3">
            <input type="text" class="form-control" id="newPerson" placeholder="Person's username" aria-label="Person's username"
                aria-describedby="button-addon2" v-model="userName">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                v-on:click="addUserBtnAction()">ADD USER</button>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import axios from 'axios';
import store from '../store'

const userName = ref(null)


const addUserBtnAction = () => {
    addUserToStore();
    userName.value = null;
}

const addUserToStore = async () => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const userApi = 'https://63e3e2d765ae49317719e670.mockapi.io/api/v1/users';

    try {
        const res = await axios.post(userApi, 
        { "name": userName.value }, 
        { headers: headers}
        );
        let personData = { ...res.data, items: [] }
        store.commit('addPerson', personData)
    } catch (error) {

    }
}

</script>