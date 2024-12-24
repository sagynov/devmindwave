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
    <div class="mx-auto px-6 py-6">
        
    <div class="flex">
        <input type="text" class="rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" placeholder="Product Name" v-model="product_name">
        <input type="text" class="rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" placeholder="Product Amount" v-model="product_amount">
        <button @click="create" v-text="is_edit ? 'Update' : 'Create'" class="ml-1 px-2 bg-indigo-600 text-center text-white rounded-md"></button>
    </div>
    <div class="mt-2">
        <ul>
            <li v-for="product in products" :key="product.id" class="my-2">
                <span v-text="product.product_name + ': '+product.product_amount"></span>
                <button @click="edit(product)" class="ml-1 px-2 bg-indigo-600 text-center text-white rounded-md">Edit</button>
                <button @click="deleteFrom(product)" class="ml-1 px-2 bg-red-600 text-center text-white rounded-md">X</button>
            </li>
        </ul>
    </div>
    
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