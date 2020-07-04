import React from 'react'
import classes from './User.module.css';
import {withRouter} from 'react-router-dom';
// import UserPost from '../../../Container/UserPost/UserPost';

function User(props) {


    const fullPostHandler = ()=>{
        props.history.push(`/post?username=${props.user.id}`);
    }
    const posts = props.post && props.post.map(post=>{
        if(post.id===props.user.id)
    return <span key={post.id}>{post.title}</span>
    else return null;
        
    })
    const user =(
        
            <div className="card bg-light mb-3" style={{maxWidth: '18 rem'}}>
                <div className="card-header">{props.user.company.name}<p><small>{props.user.company.catchPhrase}</small></p></div>
                <div className="card-body">
                    <h5 className="card-title">{props.user.name} </h5>
                    <p className="card-text">UID: {props.user.id}</p>
                    <p>Posts:{posts}</p>
                    <p className="card-text">Address : {props.user.address.city}, {props.user.address.street}, {props.user.address.suite}, {props.user.address.zipcode}</p>
                    <small>Phone:{props.user.phone}  Mail:{props.user.email} </small>
                    <p><small>{props.user.website}</small></p>
                    
                    <button onClick={fullPostHandler} type="button" className="btn btn-primary">Primary</button>
                </div>
            </div>
        
    );
    const userClasses = [classes.user," col-md-6 col-sm-12 col-lg-4"].join(' ');
    return (
        <div className={userClasses}>
           {user}
           
        </div>
    )
}

export default withRouter(User);
