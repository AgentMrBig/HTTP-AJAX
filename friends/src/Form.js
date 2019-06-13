import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const MyForm = styled.form`
    border: solid grey 1px;
    width: 15rem;
    margin: auto;
`
const MyButton = styled.button`
    border-radius: 3px;
    height: 35px;
    width: 60px;
    font-size: 15pt;
`

// Name and Email validation Function.
function validation() {
    var name = document.getElementById("name").value;
    var age = document.getElementById('age').value;
    var email = document.getElementById("email").value;
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === '' || email === '') {
        alert("Please fill all fields...!!!!!!");
        return false;
    } else if (!(email).match(emailReg)) {
        alert("Invalid Email...!!!!!!");
        return false;
    } else if (isNaN(age) || age === '') {
        alert("Please use only numbers for age!");
        console.log('age is not a number!');
        return false;
    } else {
        return true;
    }
}

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            age: '',
            email: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (validation()) {
            const data = this.state;
            console.log(data);

            axios
                .post('http://localhost:5000/friends', this.state)
                .then(response => {
                    //this.setState(() => ({ friends: response.data }));
                    console.log(response);
                })
                .catch(error => {
                    //console.error('Server Error', error);
                    console.error(error);
                })
        }


    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    render() {
        return (
            <div>
                <MyForm onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
                    <h1>Add a Friend</h1>
                    <p><input id='name' type='text' placeholder='Your Name' name='name' /></p>
                    <p><input id='age' type='text' placeholder='Age' name='age' /></p>
                    <p><input id='email' type='text' placeholder='email' name='email' /></p>
                    <p><MyButton name='submit'>Add</MyButton></p>
                </MyForm>
            </div>

        )
    }

}

export default Form;