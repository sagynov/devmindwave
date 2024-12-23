import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useProductStore = defineStore('product', {
    state: () => ({
        product_name: '',
        product_amount: 0
    }),
    actions: {
        async create() {
            console.log('Prouduct Created: ', this.product_name, this.product_amount);
            const res = await axios.post('http://dev.mindwave.kz/api/sandbox/crud', {
                product_name: this.product_name,
                product_amount: this.product_amount
            });
            if(res.status == 200) {
                alert('Product Name: '+ this.product_name);
            }
        }
    }
})
