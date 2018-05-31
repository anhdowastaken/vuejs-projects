var app = new Vue({
    el: '#app',
    data: {
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
                variantId: 2234,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 10,
            }
        ],
        sizes: [38, 39, 40, 41, 42],
        cart: 0
    },
    methods: {
        addToCart: function() {
            this.cart += 1;
        },
        removeFromCart: function() {
            if (this.cart > 0) {
                this.cart -= 1;
            }
        },
        updateProduct: function(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product;
        },
        image: function() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inventory: function() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale: function() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!';
            } else {
                return this.brand + ' ' + this.product + ' are not on sale!';
            }
        },
 
    },
});