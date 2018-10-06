import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			firstname: '',
			lastname: '',
			address: '',
			phonenumber: ''
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
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/register', {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			address: this.state.address,
			phonenumber: this.state.phonenumber
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	return (
		<div className="SignupForm">
		<a href="#section-games" class="popup__close">&times;</a>

					<div className="heading-form">
						<span className="heading-form--title">Register</span>
					</div>
					
					<form id="signup" name="signup">

						<div class="form__group">
							<input
								class="form__input"
								name="email" 
								type="email"
								placeholder="Email address"
								value={this.state.email}
								onChange={this.handleChange}
								required
							/>
						</div>

						<div class="form__group">
							<input
								name="firstname"
								class="form__input"
								type="text"
								placeholder="First name"
								value={this.state.firstname}
								onChange={this.handleChange}
								required
							/>
						</div>

						<div class="form__group">
							<input
								name="lastname"
								class="form__input"
								type="text"
								placeholder="Last name"
								value={this.state.lastname}
								onChange={this.handleChange}
								required
							/>
						</div>

						<div class="form__group">
							<input
								name="password"
								class="form__input"
								type="password"
								placeholder="Password"
								value={this.state.password}
								onChange={this.handleChange}
								required
							/>
						</div>

						<input
							class="btn btn--form"
							type="submit"
							value="Register"
							onClick={this.handleSubmit}
						/>

					</form>
				</div>

	)
}
}

export default Signup
