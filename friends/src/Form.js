import React, { Component } from 'react';


class Form extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleInputChange = () => {

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Add a Friend</h1>
                    <p><input type='text' placeholder='Your Name' name='name' /></p>
                    <p><input type='text' placeholder='Age' name='age' /></p>
                    <p><input type='text' placeholder='email' name='email' /></p>
                    <p><button name='submit'>Add</button></p>
                </form>
            </div>

        )
    }

}

export default Form;