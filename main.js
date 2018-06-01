Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
        </ul>
    `
})

Vue.component('product-review', {
    template: `
        <div>
            <form class="review-form" v-on:submit.prevent="onSubmit">

                <div v-if="errors.length">
                    <p>Please correct error(s) below before submit!</p>
                    <ul>
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                </div>

                <div>
                    <label for="name">Name</label>
                    <input id="name" name="name" v-model="name" placeholder="Name"/>
                </div>

                <div>
                    <label for="review">Review</label>
                    <textarea id="review" name="review" v-model="review" placeholder="Review"/>
                </div>

                <div>
                    <label for="raring">Rating</label>
                    <select id="rating" name="rating" v-model.number="rating">
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </div>

                <div>
                    <input id="recommend" name="recommend" type="checkbox" v-model="recommend" style="width: auto;"/>
                    <span>Recommend</span>
                </div>

                <div>
                    <input type="submit" value="Submit" />
                </div>

            </form>
        </div>
    `,
    data: function() {
        return {
            name: null,
            review: null,
            // rating: 5,
            rating: null,
            recommend: false,
            errors: []
        }
    },
    methods: {
        onSubmit: function() {
            if (this.name && this.review && this.rating) {
                let review = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', review)
                this.clearData()
            } else {
                this.errors = []
                if (!this.name) {
                    this.errors.push('Name is required')
                }
                if (!this.review) {
                    this.errors.push('Review is required')
                }
                if (!this.rating) {
                    this.errors.push('Rating is required')
                }
            }
        },
        clearData: function() {
            this.name = null
            this.review = null
            // this.rating = 5
            this.rating = null
            this.recommend = false
            this.errors = []
        }
    }
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
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

                <product-details v-bind:details="details"></product-details>

                <div v-for="(variant, index) in variants"
                     :key="variant.variantID"
                     class="color-box"
                     v-bind:style="{ 'background-color': variant.variantColor }"
                     v-on:mouseover="updateProduct(index)">
                </div>

                <div>
                    <span v-for="(size, index) in sizes" :key="index">{{ size }} </span>
                </div>

                <button v-on:click="addToCart"
                        v-bind:disabled="inventory == 0"
                        v-bind:class="{ disabledButton: inventory == 0}">Add to Cart</button>
                <button v-on:click="removeFromCart">Remove from Cart</button>

            </div>

            <div>
                <h2>Review</h2>
                <p v-show="!reviews.length">There is no review!</p>
                <div v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }}</p>
                    <p v-if="review.recommend">Recommend!</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </div>
            </div>

            <product-review v-on:review-submitted="addReview"></product-review>

        </div>
    `,
    data: function() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            onSale: false,
            details: ['80% cotton', '20% polyester', "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 100,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 10,
                }
            ],
            sizes: [38, 39, 40, 41, 42],
            reviews: []
        }
    },
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', 'add', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart', 'remove', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function(index) {
            this.selectedVariant = index
        },
        addReview: function(review) {
            this.reviews.push(review)
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
        cart: []
    },
    methods: {
        updateCart: function(method, id) {
            if (method === 'add') {
                this.cart.push(id)
            } else {
                for (i = 0; i < this.cart.length; i++) {
                    if (this.cart[i] == id) {
                        this.cart.splice(i, 1)
                        break
                    }
                }
            }
        }
    }
})
