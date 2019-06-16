import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';

var mouseX, mouseY, MyModalPanel, translate3dValue;
var scroll = 0;
var visibility = 'visible';


var panel,
    header,
    iName,
    iAge,
    iEmail,
    iClose,
    iSubmit;

var targetFriend = {};

var container = document.getElementById('root');

window.addEventListener("scroll", function (event) {
    scroll = this.scrollY;
    //console.log(scroll)
});


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

// var MyModalPanel = styled.div`
//     display: flex;
//     flex-direction: column;

//     border-radius: 3px;
//     height: 400px;
//     width: 300px;
//     background-color: lightgray;

//     position: absolute;

//     transform: translate3d(50px, 50px, 0);
//     transition: transform .3s ease-in;
//     visibility: ${visibility};
//     /* width: 75px;
//     height: 75px;
//     background-color: red;
//     border-radius: 50%;
//     border: 15px blue solid;
//     position: absolute;
//     transform: translate3d(50px, 50px, 0);
//     transition: transform .3s ease-in;
//     visibility: ${visibility}; */
// `
function mousePosListener() {
    container.addEventListener('click', function (e) {
        // mouseX = e.x;
        // mouseY = e.y;
        // mouseX = e.offsetX;
        // mouseY = e.offsetY;
        mouseX = e.clientX - (panel.offsetWidth / 2);
        mouseY = e.clientY - (panel.offsetHeight / 2);

        // if (!inEditMode) {
        //     //MyModalPanel = document.getElementById('panel');
        //     //console.log(cursorTest);


        //     var translate3dValue = "translate3d(" + (mouseX) + "px," + (mouseY - 900) + "px,0)";


        //     panel.style.transform = translate3dValue;
        //     console.log(panel.style.left)
        //     // console.log(mouseY, mouseX);
        //     // console.log(e);
        // } else if (inEditMode) {

        // }

    }, false)
}
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

        // this.modal();
        // cursorTest = document.querySelector('#cursor');
        // document.body.style.overflowY = 'scroll';
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
    positionPopupOnPage(evt) {

        var VPWH = [];                  // view port width / height
        var intVPW, intVPH;             // view port width / height
        var intCoordX = mouseX;
        var intCoordY = mouseY;    // distance from click point to view port top
        var intDistanceScrolledUp = document.body.scrollTop;
        // distance the page has been scrolled up from view port top
        var intPopupOffsetTop = intDistanceScrolledUp + intCoordY;
        // add the two for total distance from click point y to top of page

        var intDistanceScrolledLeft = document.body.scrollLeft;
        var intPopupOffsetLeft = intDistanceScrolledLeft + intCoordX;

        VPWH = getViewportWidthHeight();    // view port Width/Height
        intVPW = VPWH[0];
        intVPH = VPWH[1];

        panel.style.position = 'absolute';
        // if not display: block, .offsetWidth & .offsetHeight === 0
        //panel.style.display = 'block';
        panel.style.zIndex = '10100';

        if (intCoordX > intVPW / 2) { intPopupOffsetLeft -= panel.offsetWidth; }
        // if x is in the right half of the viewport, pull popup left by its width
        if (intCoordY > intVPH / 2) { intPopupOffsetTop -= panel.offsetHeight; }
        // if y is in the bottom half of view port, pull popup up by its height

        // panel.style.top = intPopupOffsetTop + 'px';
        // panel.style.left = intPopupOffsetLeft + 'px';

        translate3dValue = "translate3d(" + (mouseX) + "px," + (mouseY - 900) + "px,0)";
        panel.style.transform = translate3dValue;

        //     panel.style.transform = translate3dValue;
        //     console.log(panel.style.left)
        //     // console.log(mouseY, mouseX);
        //     // console.log(e);
    }   // end fn positionPopupOnPage



    modal(targetFriend) {
        window.scrollTo(0, 0);


    }

    openModel(e) {
        document.getElementById('modal').style.visibility = 'visible';
    }

    // update = (id, updatedFriend) => {
    //     axios
    //         .put(`http://localhost:5000/friends/${id}`, updatedFriend)
    //         .then(res => {
    //             //this.setState({ targetFriend: response.data })
    //             //this.setState(() => ({ targetFriend: res.data }));

    //             //this.modal(this.state.targetFriend);
    //             console.log(res);
    //             console.log('IN UPDATE');
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }

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
                // this.setState({
                //     name: targetFriend.name,
                //     age: targetFriend.age,
                //     email: targetFriend.email
                // })

            }
        })
        this.setState({
            targetFriend: targetFriend,
            name: targetFriend.name,
            age: targetFriend.age,
            email: targetFriend.email
        })

        //console.log(targetFriend);

        console.log('targetFriend ' + targetFriend.name);

        //this.modal(targetFriend);
        //panel.style.visibility = 'visible';


        //this.positionPopupOnPage();


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

    reload() {
        window.location.reload(true);
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
                {/* <MyModalPanel id="panel" /> */}


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