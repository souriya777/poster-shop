new Vue({
	el: "#app",
	data: {
    total: 0,
		products: [
			{ id: 1, title: "Product 1", price: 3.99 },
			{ id: 2, title: "Product 2", price: 4 },
			{ id: 3, title: "Product 3", price: 5.99 },
		],
		cart: []
	},
	methods: {
		addToCart: function(product) {
      this.total += product.price;
      const cartItem = this.cart.find(({ id }) => id === product.id);
      if (cartItem) {
        cartItem.qty++
      } else {
        this.cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          qty: 1
        });
      }
    },
    inc: function(item) {
      item.qty++;
      this.total += item.price;
    },
    dec: function(item) {
      if(item.qty === 1) {
        this.cart = this.cart.filter(({ id }) => id !== item.id)
      } else {
        item.qty--;
        this.total -= item.price;
      }
    },
  },
  // computed: {
  //   total: function() {
  //     if(this.cart.length > 0) {
  //       return this.cart.reduce((acc, current) => acc + current.price)
  //     } else {
  //       return 0;
  //     }
  //   }
  // },
  // watch: {
  //   cart: function(val) {
  //     const cartItem = this.cart.filter(({ id }) => id === val.id);
  //     console.log(cartItem.price)
  //     if(cartItem) {
  //       cartItem.price = cartItem.qty * cartItem.price;
  //     }
  //   }
  // },
  filters: {
    currency: function(price) {
      return '$' + price.toFixed(2)
    }
  }
});