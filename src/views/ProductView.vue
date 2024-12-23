<script>
import { useListStore } from '@/stores/list'


// States
export default {
    data() {
        return {
            id: 0,
            product_name: '',
            product_amount: 0,
            is_edit: false,
            store: useListStore(),
        }
    },
    computed: {
        products() {
            return this.store.products;
        }
    },
    methods: {
        create() {
            if(this.is_edit) {
                this.store.editProduct(this.id, this.product_name, this.product_amount);
                this.is_edit = false;
            }else{
                if(this.product_name == ''){
                    alert('Please fill the product name');
                    return;
                }
                this.store.addToList(this.product_name, this.product_amount);
            }
            this.id = 0;
            this.product_name = '';
            this.product_amount = 0;
            
        },
        deleteFrom(product)
        {
            if (confirm('Are you sure?')) {
                this.store.deleteFromList(product);
            }
        },
        edit(product) {
            this.is_edit = true;
            this.id = product.id;
            this.product_name = product.product_name;
            this.product_amount = product.product_amount;
        }
    }
}


</script>

<template>
    <div class="flex">
        <input type="text" placeholder="Product Name" v-model="product_name">
        <input type="text" placeholder="Product Amount" v-model="product_amount">
        <button @click="create" v-text="is_edit ? 'Update' : 'Create'"></button>
    </div>
    <div class="mt-2">
        <ul>
            <li v-for="product in products" :key="product.id">
                <span v-text="product.product_name + ': '+product.product_amount"></span>
                <button @click="edit(product)" class="ml-1">Edit</button>
                <button @click="deleteFrom(product)" class="ml-1">X</button>
            </li>
        </ul>
    </div>
</template>

<style>
.ml-1 {
    margin-left: 10px;
}
.mt-2 {
    margin-top: 20px;
}
.flex {
    display: flex;

}
</style>