import React from 'react';
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'react-date-picker';


const EditProfileForm = (props) => (
  <Card className="container">
    <form action="/" onSubmit={props.onSubmit}>
      <h2 className="card-heading">Profile Page</h2>

      {props.errors.message && <p className="error-message">{props.errors.message}</p>}
      {props.successMessage && <p className="success-message">{props.successMessage}</p>}


      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="firstname"
          onChange={props.onChange}
          errorText={props.errors.firstname ?(props.errors.firstname) :("")}
          value={props.firstname}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lastname"
          onChange={props.onChange}
          errorText={props.errors.lastname ?(props.errors.lastname) :("")}
          value={props.lastname}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="City"
          name="city"
          onChange={props.onChange}
          errorText={props.errors.city ?(props.errors.city) :("")}
          value={props.city}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={props.onChange}
          errorText={props.errors.password ?(props.errors.password) :("")}
          value={props.password}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Research Interest"
          name="interest"
          onChange={props.onChange}
          errorText={props.errors.interest ?(props.errors.interest) :("")}
          value={props.interest}
        />
      </div>

      <div className="field-line" >
        <DatePicker
          name="birthday"
          onChange={props.onChangeDate}
          value={props.birthday}
        />
        Birthday
      </div>


      <div>
          <Checkbox
              name="privacy"
              value='privacy'
              checked={props.privacy}
              onCheck={props.onCheckBoxChange('privacy')}
              label="Set profile to private."
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Save Changes" primary />
      </div>

    </form>
  </Card>
);

EditProfileForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	firstname:PropTypes.string.isRequired,
	lastname:PropTypes.string.isRequired,
	password:PropTypes.string.isRequired,
	birthday:PropTypes.instanceOf(Date).isRequired,
	city: PropTypes.string.isRequired,
	privacy: PropTypes.bool.isRequired,
};

export default EditProfileForm;
