import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';

var mouseX, mouseY, translate3dValue;



var panel,
    iName,
    iAge,
    iEmail;

var targetFriend = {};

var container = document.getElementById('root');

//Start Form 
const MyForm = styled.form`
    border: solid grey 1px;
    width: 15rem;
    margin: auto;
`
const MyButton = styled.button`
    border-radius: 3px;
    height: 35px;
    width: 80px;
    font-size: 15pt;
`
//End Form 

const FriendCard = styled.div`
    border: solid lightgray 1px;
    margin-top: 20px;
    width: 35%;
    border-radius: 3px;
`

const FriendsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Button = styled.button`
    width: 60px;
    height: 30px;
    padding: 5px;
    margin: 10px;
    
`



function getViewportWidthHeight() {
    var w = window;
    var d = document
    var e = d.documentElement;
    var g = d.getElementsByTagName('body')[0];
    var viewX = w.innerWidth || e.clientWidth || g.clientWidth;
    var viewY = w.innerHeight || e.clientHeight || g.clientHeight;
    return [viewX, viewY];
}

export default class FriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inEditMode: false,
            friends: [],
            targetFriend: {},
            name: '',
            age: '',
            email: ''
        };


    }

    componentDidMount() {
        this.getFriendsList();

    }

    getFriend = id => {

        console.log(id);
        const selectedFriend = this.state.friends.find(friend => friend.id === id);
        this.setState({ friend: selectedFriend });
    }
    // START Form 
    // Name and Email validation Function.
    validation() {
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

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validation()) {
            const data = this.state;
            console.log(data);

            axios
                .post('http://localhost:5000/friends', {
                    name: this.state.name,
                    age: this.state.age,
                    email: this.state.email,
                })
                .then(res => {
                    //this.setState(() => ({ friends: res.data }));
                    // this.setState((prevState, props) => {
                    //     console.log()
                    // })
                    this.setState({
                        friends: res.data,
                        name: "",
                        age: "",
                        email: ""
                    })
                    iName.value = '';
                    iAge.value = '';
                    iEmail.value = '';
                    console.log(res);
                })
                .catch(error => {
                    //console.error('Server Error', error);
                    console.error(error);
                })

            //this.reload();
            // this.setState({
            //     name: '',
            //     age: '',
            //     email: ''
            // })


        }


    }

    handleEditSubmit = (event) => {


        event.preventDefault();
        if (this.validation()) {
            const data = this.state;
            console.log(data);

            axios
                .put(`http://localhost:5000/friends/${targetFriend.id}`,
                    {
                        name: this.state.name,
                        age: this.state.age,
                        email: this.state.email,
                    }
                )
                .then(res => {
                    //this.setState(() => ({ friends: res.data }));
                    // this.setState((prevState, props) => {
                    //     console.log()
                    // })
                    this.setState({
                        friends: res.data,
                        name: "",
                        age: "",
                        email: ""
                    })

                    console.log(res);
                })
                .catch(error => {
                    //console.error('Server Error', error);
                    console.error(error);
                })


            this.setState({
                inEditMode: false
            })
            // clear input fields
            document.getElementById('name').nodeValue = '';
            document.getElementById('age').nodeValue = '';
            document.getElementById('email').nodeValue = '';

        }


    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);

    }
    // END Form

    getFriendsList() {
        axios
            .get('http://localhost:5000/friends')
            .then(response => {
                this.setState(() => ({ friends: response.data }));
                console.log(response.data);
            })
            .catch(error => {
                //console.error('Server Error', error);
            })
    }

    // positon popup on page relative to cursor
    // position at time of click event  

    edit(id) {
        // set translate3d css to the mouse position, which is captured on 'click' event
        // within the page. The goal is to add a modal on mouse position when the user
        // clicks the edit button.
        this.setState({
            inEditMode: true
        })

        console.log('EDIT!');
        targetFriend =
            {
                name: 'loading..',
                age: 'loading..',
                email: 'loading..'
            }

        this.state.friends.forEach(function (item, index, array) {
            //console.log('friends for each ' + item.id, index, array);
            if (id === item.id) {
                console.log(item.id)
                targetFriend = {
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    email: item.email
                }

            }
        })
        this.setState({
            targetFriend: targetFriend,
            name: targetFriend.name,
            age: targetFriend.age,
            email: targetFriend.email
        })

        console.log('targetFriend ' + targetFriend.name);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    del(id) {

        axios
            .delete(`http://localhost:5000/friends/${id}`)
            .then(response => {
                this.setState(() => ({ friends: response.data }));
                console.log('response', response);
            })
            .catch(error => {
                //console.error('Server Error', error);
                console.error(error);
            })

    }

    render() {
        return (
            <FriendsListContainer>
                {this.state.inEditMode ?
                    <MyForm onSubmit={this.handleEditSubmit} >
                        <h1>Edit {targetFriend.name}</h1>
                        <p><input id='name' type='text' placeholder={targetFriend.name} name='name' onChange={this.handleInputChange} value={this.state.name} /></p>
                        <p><input id='age' type='text' placeholder='' name='age' onChange={this.handleInputChange} value={targetFriend.age} /></p>
                        <p><input id='email' type='text' placeholder='' name='email' onChange={this.handleInputChange} value={targetFriend.email} /></p>
                        <p><MyButton onClick={this.getFriendsList} name='submit'>Submit</MyButton></p>
                    </MyForm>
                    :
                    <MyForm onSubmit={this.handleSubmit} >
                        <h1>Add a Friend</h1>
                        <p><input id='name' type='text' placeholder='Your Name' name='name' onChange={this.handleInputChange} value={this.state.name} /></p>
                        <p><input id='age' type='text' placeholder='Age' name='age' onChange={this.handleInputChange} value={this.state.age} /></p>
                        <p><input id='email' type='text' placeholder='email' name='email' onChange={this.handleInputChange} value={this.state.email} /></p>
                        <p><MyButton onClick={this.getFriendsList} name='submit'>Add</MyButton></p>
                    </MyForm>

                }

                {this.state.friends.map(friend => (
                    <FriendCard key={friend.id} id={friend.id} >
                        <p>Name: {friend.name}</p>
                        <p>Age: {friend.age}</p>
                        <p>Email: {friend.email}</p>
                        <Button onClick={() => { this.edit(friend.id) }}>Edit</Button>
                        <Button onClick={() => { this.del(friend.id) }}>Delete</Button>
                    </FriendCard>
                ))}
            </FriendsListContainer>
        )
    }
}