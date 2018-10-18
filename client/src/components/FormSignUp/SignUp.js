import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			firstname: '',
			lastname: '',
			address: '',
			phonenumber: '',
			message: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault();

		//request to server to add a new email/password
		axios.post('/register', {
			email: this.state.email,
			password: this.state.password,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			address: this.state.address,
			phonenumber: this.state.phonenumber
		})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					this.props.updateUser({
						loggedIn: true,
						email: response.data.email,
						firstname: response.data.firstname
					})
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/'
					})
					console.log(this.state)
				} else {
					console.log('email address already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)
			})
		}

		


render() {

	return (
		<div className="SignupForm">

						<div className="heading-form">
							<span className="heading-form--title">Sign up</span>
						</div>
						
						<form id="signup" name="signup">

							<div className="form__group">
								<input
									className="form__input"
									name="email" 
									type="email"
									placeholder="Email address"
									value={this.state.email}
									onChange={this.handleChange}
									required
								/>
							</div>

							<div className="form__group">
								<input
									name="firstname"
									className="form__input icon-form far fa-envelope"
									type="text"
									placeholder="First name"
									value={this.state.firstname}
									onChange={this.handleChange}
									required
								/>
							</div>

							<div className="form__group">
								<input
									name="lastname"
									className="form__input"
									type="text"
									placeholder="Last name"
									value={this.state.lastname}
									onChange={this.handleChange}
									required
								/>
							</div>

							<div className="form__group">
								<input
									name="password"
									className="form__input"
									type="password"
									placeholder="Password"
									value={this.state.password}
									onChange={this.handleChange}
									required
								/>
							</div>

							<input
								className="btn btn--form"
								type="submit"
								value="Sign up"
								onClick={this.handleSubmit}
							/>

							<hr className="form-break" />

							<div className="heading-form">
								<span className="heading-form--text">Already have an account? Login</span>
							</div>

						</form>
					</div>

		)
}
}

export default Signup
