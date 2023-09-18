<template>
    <div v-if="options.length">
        <div v-for="(item, index) in selectFields" :key="index">
            <div class="row justify-content-between">
                <div class="col-3">
                    <label :for="`price-${index}`" class="form-label d-flex justify-content-left">Price</label>
                    <input type="number" :id="`price-${index}`" :disabled="item.lockedPrice"
                        v-model="item.price" @blur="blured(index)" style="width: 100%;">
                    <span>(click outside the price box to confirm the price)</span>
                </div>
                <div class="col-9">
                  <div v-if="!item.lockedPrice">
                    PLEASE ENTER THE PRICE BEFORE CHOOSING USERS TO BILL!
                  </div>
                  <div v-else>
                    <label :for="index" class="form-label d-flex justify-content-left">Select User</label>
                    <VueMultiselect v-model="item.selected"  @remove="removed" @select="selected"
                        :multiple="true" :options="options" :id="index" label="name" track-by="id">
                    </VueMultiselect>
                  </div>
                </div>
            </div>

        </div>
        <button @click="addItem()" style="margin-top: 20px;"> Add item</button>
    </div>
    <div v-else>
        <span>PLEASE ADD USER BEFORE SELECTING ITEMS TO BILL!</span>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import VueMultiselect from 'vue-multiselect'
import store from '../store'

const options = ref([]);

const selectFields = ref([])

const blured = (index) => {
    let id = selectFields.value.length - 1;

    store.commit('addItem', { id: id, itemPrice: selectFields.value[id].price, usersInvolved: 0 })

    let price = selectFields.value[index].price;

    if( price != 0 && price !== undefined && price !== null && price !== "" ){
        selectFields.value[index].lockedPrice = true;
    }
}

const addItem = () => {
    selectFields.value.push({ price: 0, selected: [], lockedPrice: false });
}

const selected = (item, id) => {
    let payloadObj = {
        id: item.id,
        itemId: id,
        debt: selectFields.value[id].price / selectFields.value[id].selected.length
    }

    store.commit('updatePerson', payloadObj)
    store.commit('updateItem', payloadObj)
}

const removed = (item, id) => {
    let payloadObj = {
        personId: item.id,
        itemId: id
    }
    store.commit('removeItemFromUser', payloadObj)

}

watch(store.state.persons, (newUsername) => {
    options.value = [];
    newUsername.forEach(item => {
        options.value.push({ name: item.name, id: item.id, debt: item.items })
    })
});

</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>