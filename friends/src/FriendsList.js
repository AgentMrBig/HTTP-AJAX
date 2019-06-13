import React, { Component } from 'react';
import styled from 'styled-components'

import axios from 'axios';

const FriendCard = styled.div`
    border: solid lightgray 1px;
    margin-top: 20px;
    width: 35%;
    
`

const FriendsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default class FriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/friends')
            .then(response => {
                this.setState(() => ({ friends: response.data }));
            })
            .catch(error => {
                console.error('Server Error', error);
            })
    }

    render() {
        return (
            <FriendsListContainer>
                {this.state.friends.map(friend => (
                    <FriendCard key={friend.id}  >
                        <p>Name: {friend.name}</p>
                        <p>Age: {friend.age}</p>
                        <p>Email: {friend.email}</p>
                    </FriendCard>
                ))}
            </FriendsListContainer>
        )
    }
}