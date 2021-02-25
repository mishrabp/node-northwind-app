import ajax from "../ajaxCall";

const AppCustomerListComonent = Vue.extend({
  data: function () {
    return {
      customers: [],
      title: "Customer List",
    };
  },
  methods: {
    getCustomerList: async function () {
      var url = "/api/customer";
      var dataParams = {};
      var headers = {
        "Content-Type": "application/json",
        "x-auth-token": this.$data.authToken,
      };
      ajax.ajaxHandler(url, ajax.methodTypeGet, headers, dataParams, (data) => {
        if (data !== "INVALID_PARAMETERS") {
          this.$data.customers = data.data;
        } else {
          alert("There is a problem on server side. Please try again later.");
        }
      });
    },
  },
  mounted: async function () {
    console.log("loading customer");
    await this.getCustomerList();
  },

  template:
  "<div>" + 
  "<div v-if='customers.length > 0'>" +
  "<div class='flex flex-wrap'>" +
  "<div v-for='(customer,index) in customers' class='flex items-center mt-4 w-full px-4 lg:w-1/2 xl:w-1/3 rounded-lg bg-white shadow-lg overflow-hidden hover:shadow-2xl'>" +
  "<img class='h-32 w-32 flex-shrink-0' src='images/profile.svg' alt='profile image'>" +
  "<div class='px-6 py-4'>" +
  "<h3 class='break-normal text-lg font-semibold text-gray-800'>{{customer.CompanyName}}</h3>" +
  "<p class='text-gray-600'>{{customer.ContactTitle}}</p>" +
  "<p>{{customer.Phone}}</p>" +
  "<p>{{customer.Fax}}</p>" +
  "<div class='mt-4'>" +
  "<a href='#' class='card-link'>Card link</a> | " +
  "<a href='#' class='card-link'>Another link</a>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>" ,
});

/**Registering Component */
Vue.component("app-customer-list", AppCustomerListComonent);

/* Instanstiating Vue*/
var app = new Vue({
  el: "#app",
  data: {},
});

export default { AppCustomerListComonent };
