import React, { Component } from 'react';
import API from "../../utils/API"

class ValidateForm extends Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      console.log(this.state.fields)
      API.submitRegisterInfo(this.state.fields)
        .then( response => {
          if (response.data.email) {
            this.props.updateUser({
              loggedIn: true,
              email: response.data.email,
              firstname: response.data.firstname
            })
            console.log('successful signup')
            this.setState({
              redirectTo: '/'
            })            
          } else {
            console.log(response.data.error)
          }
        })
        .catch( error => {
          console.log('signup error: ')
          console.log(error)
        })
      let fields = {};
      fields["email"] = "";
      fields["phonenumber"] = "";
      fields["password"] = "";
      this.setState({fields:fields});
      alert("Form submitted");
    }
  }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email.";
      }

      if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email.";
        }
      }

      if (!fields["phonenumber"]) {
        formIsValid = false;
        errors["phonenumber"] = "*Please enter your mobile no.";
      }

      if (typeof fields["phonenumber"] !== "undefined") {
        if (!fields["phonenumber"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["phonenumber"] = "*Please enter valid mobile no.";
        }
      }

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
        }
      }

      this.setState({
        errors: errors
      });
      return formIsValid;


    }

  render() {
    return (
      <div>

        <div className="heading-form">
						<span className="heading-form--title">Sign up</span>
				</div>

        <form  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm}>
        <div className="form__group">
          <input 
            type="text" 
            name="firstname" 
            className="form__input"
            placeholder="First Name"
            value={this.state.fields.firstname} 
            onChange={this.handleChange} 
          />
        </div>
        <div className="errorMsg">{this.state.errors.username}</div>

        <div className="form__group">
          <input 
            type="text" 
            name="lastname" 
            className="form__input"
            placeholder="Last Name"
            value={this.state.fields.lastname} 
            onChange={this.handleChange} 
          />
        </div>
        <div className="errorMsg">{this.state.errors.username}</div>

        <div className="form__group">
          <input 
            className="form__input"
            type="text" 
            name="email" 
            placeholder="Email"
            value={this.state.fields.email} 
            onChange={this.handleChange}  
          />
        </div>
        <div className="errorMsg">{this.state.errors.email}</div>

        <div className="form__group">
          <input 
            className="form__input"
            type="text" 
            name="phonenumber" 
            placeholder="Phone"
            value={this.state.fields.phonenumber} 
            onChange={this.handleChange}
          />
        </div>
        <div className="errorMsg">{this.state.errors.phonenumber}</div>

        <div className="form__group">
          <input 
            className="form__input"
            type="password" 
            name="password" 
            placeholder="Password"
            value={this.state.fields.password} 
            onChange={this.handleChange} 
          />
        </div>
        <div className="errorMsg">{this.state.errors.password}</div>

        <input 
          type="submit" 
          className="btn btn--form"  
          value="Register"
          onClick={this.handleSubmit}
          />
          
        </form>
      </div>

      );
  }
}

export default ValidateForm;