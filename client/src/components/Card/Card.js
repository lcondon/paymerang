import React from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: []
    };
  }

  componentDidMount() {
    API.getPayment(this.props.match.params.id).then(result => {
      this.setState({ payment: [result.data] });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          {this.state.payment.map(payment => {
            let Remittance = payment.Remittance;
            return (
              <div key={payment._id}>
                <h1>{payment.Payee.Name}</h1>
                <Divider />
                <p>
                  <strong>Fax:</strong> {payment.Payee.Fax}
                </p>
                <p>
                  <strong>Phone:</strong> {payment.Payee.Phone}
                </p>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li>{payment.Payee.Address.Address1}</li>
                  <li>
                    {payment.Payee.Address.City},{' '}
                    {payment.Payee.Address.StateOrProvince}
                  </li>
                  <li>{payment.Payee.Address.PostalCode}</li>
                </ul>
                <h2>Payment</h2>
                <p>
                  <strong>PAN:</strong> {payment.Payment.PAN}
                </p>
                <p>
                  <strong>CVV:</strong> {payment.Payment.CVV}
                </p>
                <p>
                  <strong>Exp:</strong> {payment.Payment.Exp}
                </p>
                <h2>Remittance</h2>
                {Remittance.map(Remittance => {
                  return (
                    <div key={Remittance.PayorName}>
                      <h3>{Remittance.PayorName}</h3>
                      <p>
                        <strong>Payor Id:</strong> {Remittance.PayorId}
                      </p>
                      <p>
                        <strong>Invoice Number:</strong> {Remittance.InvoiceNo}
                      </p>
                      <p>
                        <strong>Description:</strong> {Remittance.Description}
                      </p>
                      <p>
                        <strong>Amount:</strong> {Remittance.Amount}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Paper>
        <Link to="/">
          <Button variant="outlined" className={classes.button}>
            <HomeIcon />
          </Button>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Card);
