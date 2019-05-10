import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { receiveFRList, unfriend, acceptFR } from '../actions/userActions';
import {Link} from 'react-router-dom'


function mapStateToProps(state) {
    var logged = state.authentication.id;

    return {
        friends: state.friendship.friendsAndWannabes && state.friendship.friendsAndWannabes.filter(user => user.status == 2),
        wannabes: state.friendship.friendsAndWannabes && state.friendship.friendsAndWannabes.filter(user => (user.status == 1 && user.sender_id != logged)),
        token:state.authentication.token
    }
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
        console.log("this.props.status ", this.props.status);
        this.state = {
            status: this.props.status
        };
    }

    componentDidMount() {
        this.props.dispatch(receiveFRList(this.props.token));
    }

    render () {
        if (!this.props.friends) {
            return null;
        }
        return (
            <div className="friends-list">
                <div className="wannabes">
                    <h3>Pending:</h3>
                    {this.props.wannabes == 0 && <p>You have no pending friend requests :)</p>}
                    {this.props.wannabes.map(wannabe => {
                        return (
                            <div key={wannabe.id} className="wannabe">
                                <div className="friends-right">
                                    <div className="friends-name">
                                        {wannabe.first} {wannabe.last}
                                    </div>
                                    <button className="frbtn" onClick={ () =>
                                        this.props.dispatch(acceptFR(wannabe.id, this.props.token))}>Accept</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="friends">
                    <h3>Friends:</h3>
                    {this.props.friends == 0 && <p>You have no friends yet :(</p>}
                    {this.props.friends.map(friend => {
                        return (
                            <div key={friend.id} className="friend">
                                <div className="friends-right">
                                    <div className="friends-name">
                                        {friend.first} {friend.last}
                                    </div>
                                    <button className="frbtn" onClick={ () =>
                                        this.props.dispatch(unfriend(friend.id, this.props.token))}>Unfriend</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

//MUST BE AFTER CLASS COMPONENT!
export default connect (mapStateToProps)(Friends);