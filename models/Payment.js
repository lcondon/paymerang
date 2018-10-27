const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  Payee: {
    Name: String,
    Fax: String,
    Phone: String,
    Address: {
      Address1: String,
      Address2: String,
      City: String,
      StateOrProvince: String,
      Country: String,
      PostalCode: Number
    },
    Attention: String,
    SubmissionDate: String
  },
  Payment: {
    PAN: Number,
    CVV: Number,
    Exp: String
  },
  Remittance: Array
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
