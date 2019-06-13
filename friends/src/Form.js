import React, { Component } from 'react';
import styled from 'styled-components';

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

class Form extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleInputChange = () => {

    }

    render() {
        return (
            <div>
                <MyForm onSubmit={this.handleSubmit}>
                    <h1>Add a Friend</h1>
                    <p><input type='text' placeholder='Your Name' name='name' /></p>
                    <p><input type='text' placeholder='Age' name='age' /></p>
                    <p><input type='text' placeholder='email' name='email' /></p>
                    <p><MyButton name='submit'>Add</MyButton></p>
                </MyForm>
            </div>

        )
    }

}

export default Form;