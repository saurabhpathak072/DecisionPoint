import React from 'react'
import User from './User/User';
import classes from './Users.module.css';
import Loader from '../../UI/Loader/Loader';
import Autocomplete from '../AutoCompleteText/Autocomplete'

function Users(props) {
    
    let users =null;
    if(props.users === null){
        users=<Loader />
    }
     else
    { users =  props.users.map(user=>{
        return <User key={user.id} user={user} post={props.post}/>
    })}
    const userClasses = [classes.users,'row']
    
    return (<>
    {/* <Autocomplete search={(uname)=>this.searchuser(uname)} suggestions={props.users}  /> */}
    <Autocomplete  suggestions={props.name}  search={props.search}/>
        <div className={userClasses.join(' ')}>
           {users}
        </div>
        </>
    )
}

export default Users
