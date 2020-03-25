const LOAD_NUM = 3;
let watcher;

setTimeout(function() {
  new Vue({
    el: "#app",
    data: {
      total: 0,
      products: [],
      cart: [],
      searchValue: "cat",
      lastSearchValue: "",
      loading: false,
      results: [],
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
        this.products = [];
        this.results = [];
        this.loading = true;
  
        const path = `/search?q=${this.searchValue}`;
        this.$http.get(path)
          .then(response => {
            setTimeout(() => {
              this.lastSearchValue = this.searchValue;
              this.results = response.body;
              this.appendResults();
              this.loading = false;
            }, 1500);
          });
      },
      appendResults: function() {
        if(this.products.length < this.results.length) {
          const toAppend = this.results.slice(
            this.products.length,
            this.products.length + LOAD_NUM
          );
          this.products = this.products.concat(toAppend);
        }
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
    created: function() {
      this.onSearch();
    },
    beforeUpdate: function() {
      if(watcher) {
        watcher.destroy();
        watcher = null;
      }
    },
    updated: function() {
      let sensor = document.querySelector("#product-list-bottom");
      watcher = scrollMonitor.create(sensor);
      watcher.enterViewport(this.appendResults);
    },
    filters: {
      currency: function(price) {
        return '$' + price.toFixed(2)
      }
    }
  });
}, 3000);
