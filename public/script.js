new Vue({
	el: "#app",
	data: {
    total: 0,
		products: [],
		cart: [],
    searchValue: "",
    lastSearchValue: "",
    loading: false
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
    onSearch: function() {
      this.product = [];
      this.loading = true;

      const path = `/search?q=${this.searchValue}`;
      this.$http.get(path)
        .then(response => {
          setTimeout(() => {
            this.products = response.body;
            this.lastSearchValue = this.searchValue;
            this.loading = false;
          }, 1500);
        });
    }
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