import React, { Component } from 'react';
import styled from 'styled-components'
import Form from './Form';

import axios from 'axios';

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

export default class FriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            targetFriend: {}
        };
    }

    componentDidMount() {
        this.getFriendsList();
    }

    getFriendsList() {
        axios
            .get('http://localhost:5000/friends')
            .then(response => {
                this.setState(() => ({ friends: response.data }));
                console.log('test');
            })
            .catch(error => {
                console.error('Server Error', error);
            })
    }

    edit(id) {
        console.log('EDIT!');
        axios
            .put(`http://localhost:5000/friends/${id}`)
            .then(response => {
                //this.setState(() => ({ friends: response.data }));
                console.log(response);
            })
            .catch(error => {
                //console.error('Server Error', error);
                console.error(error);
            })
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

    reload() {
        window.location.reload(true);
    }

    render() {
        return (
            <FriendsListContainer>
                <Form props={this.getFriendsList} />
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