import React from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

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
    payments: [],
    paymentArrays: []
  };
  componentDidMount() {
    API.getPayments().then(results => {
      let paymentArrays = [];
      for (let i = 0; i < results.data.length; i++) {
        let payorObj = results.data[i].Payee;
        payorObj.id = results.data[i]._id;
        payorObj.link = (
          <Link to={`/payments/${results.data[i]._id}`}>
            {results.data[i].Payment.PAN}
          </Link>
        );
        paymentArrays.push(payorObj);
      }
      this.setState({ payments: results.data, paymentArrays: paymentArrays });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MaterialTable
          columns={[
            { title: 'Name', field: 'Name' },
            { title: 'Fax', field: 'Fax' },
            { title: 'Phone', field: 'Phone' },
            { title: 'Attention', field: 'Attention' },
            { title: 'Submission Date', field: 'SubmissionDate' },
            { title: 'Link', field: 'link' }
          ]}
          data={this.state.paymentArrays}
          title="Payments"
          options={{
            paging: true,
            search: true,
            toolbar: true
          }}
        />
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(List);
