import axios from 'axios';

export default {
  // Gets all payments
  getPayments: function() {
    return axios.get('/api/payments');
  },
  // Gets the payment with the given id
  getPayment: function(id) {
    return axios.get(`/api/payments/${id}`);
  }
};
