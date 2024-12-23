import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useListStore = defineStore('product', {
    state: () => ({
        products: [
            {id: 1, product_name: "Product 1", product_amount: 115},
            {id: 2, product_name: "Product 2", product_amount: 42},
            {id: 3, product_name: "Product 3", product_amount: 200}
        ],
    }),
    actions: {
        addToList(product_name, product_amount) {
            axios.post('http://dev.mindwave.kz/api/sandbox/crud', {
                product_name,
                product_amount
            }).then((res) => {
                if(res.status == 200) {
                    let last_product = this.products[this.products.length - 1];
                    let id = Number(last_product.id) + 1;
                    this.products.push({
                        id,
                        product_name,
                        product_amount
                    });
                    console.log('Prouduct Created: ', res);
                }
            }).catch((err) => {
                alert('Something went wrong', err);
            })
        },
        deleteFromList(product) {
            const id = product.id;
            axios.delete('http://dev.mindwave.kz/api/sandbox/crud/'+id).then((res) => {
                if(res.status == 200) {
                    console.log('Product deleted', res);
                    this.products = this.products.filter((product) => {
                        return product.id != id
                    });
                }
            }).catch((err) => {
                console.log('Something went wrong', err);
            })
        },
        editProduct(id, product_name, product_amount)
        {
            axios.put('http://dev.mindwave.kz/api/sandbox/crud/'+id, {
                product_name,
                product_amount
            }).then((res) => {
                this.products.map((product) => {
                    if(product.id == id) {
                        product.product_name = product_name;
                        product.product_amount = product_amount;
                    }
                });
                console.log('Product Edited', res);
            }).catch((err) => {
                console.log('Something went wrong');
            });
        }
    }
})
