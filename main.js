var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        // link: 'https://www.dropbox.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0',
        // inStock: true,
        inventory: 100,
        onSale: false,
        details: ['80% cotton', '20% polyester', "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2234,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
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
        updateProduct: function(variantImage) {
            this.image = variantImage;
        }
    },
});