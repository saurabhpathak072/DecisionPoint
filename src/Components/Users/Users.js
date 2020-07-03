import React from 'react'
import User from './User/User';
import classes from './Users.module.css';
import Loader from '../../UI/Loader/Loader';

function Users(props) {
    console.log(props.post)
    let users =null;
    if(props.users === null){
        users=<Loader />
    }
     else
    { users =  props.users.map(user=>{
        return <User key={user.id} user={user} post={props.post}/>
    })}
    const userClasses = [classes.users,'row']
    return (
        <div className={userClasses.join(' ')}>
           {users}
        </div>
    )
}

export default Users
