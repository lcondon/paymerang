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
                <p>{payment.Payee.Name}</p>
                <Divider />

                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li>{payment.Payee.Address.Address1}</li>
                  <li>
                    {payment.Payee.Address.City},{' '}
                    {payment.Payee.Address.StateOrProvince}
                  </li>
                  <li>{payment.Payee.Address.PostalCode}</li>
                </ul>
                {Remittance.map(Remittance => {
                  return (
                    <p key={Remittance.PayorName}>{Remittance.PayorName}</p>
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
