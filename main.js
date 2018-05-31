Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        props_details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="product">

            <div class="product-image">
                <img v-bind:src="image" v-bind:alt="description" />
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>

                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else class="outOfStock">Out of Stock</p>
                <span>{{ sale }}</span>
                <p>Shipping: {{ shipping }}</p>

                <product-details v-bind:details="props_details"></product-details>

                <div v-for="(variant, index) in variants"
                     :key="variant.variantID"
                     class="color-box"
                     v-bind:style="{ 'background-color': variant.variantColor }"
                     v-on:mouseover="updateProduct(index)">
                </div>

                <div>
                    <span v-for="size in sizes">{{ size }} </span>
                </div>

                <div class="cart">
                    <p>Cart ({{ cart }})</p>
                </div>

                <button v-on:click="addToCart"
                        v-bind:disabled="inventory == 0"
                        v-bind:class="{ disabledButton: inventory == 0}">Add to Cart</button>
                <button v-on:click="removeFromCart">Remove from Cart</button>
            </div>

        </div>
    `,
    data: function() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            onSale: false,
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 100,
                },
                {
                    variantId: 2234,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 10,
                }
            ],
            sizes: [38, 39, 40, 41, 42],
            cart: 0
        }
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        removeFromCart: function() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },
        updateProduct: function(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product
        },
        image: function() {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory: function() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale: function() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            } else {
                return this.brand + ' ' + this.product + ' are not on sale!'
            }
        },
        shipping: function() {
            if (this.premium) {
                return 'Free'
            } else {
                return 2.99
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        details: ['80% cotton', '20% polyester', "Gender-neutral"]
    }
})
