import React from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class List extends React.Component {
  state = {
    payments: []
  };
  componentDidMount() {
    API.getPayments().then(results => {
      this.setState({ payments: results.data });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.payments.map(payment => (
          <ExpansionPanel key={payment._id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                {payment.Payee.Name}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                PAN:{' '}
                <Link to={`/payments/${payment._id}`}>
                  {payment.Payment.PAN}
                </Link>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(List);
