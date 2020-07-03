import React from 'react'
import User from './User/User';
import classes from './Users.module.css';

function Users(props) {
     
    const users = props.users && props.users.map(user=>{
        return <User key={user.id} user={user}/>
    })
    const userClasses = [classes.users,'row']
    return (
        <div className={userClasses.join(' ')}>
           {users}
        </div>
    )
}

export default Users
