import React from 'react'
import classes from './User.module.css';

function User(props) {
    const user =(
        
            <div className="card bg-light mb-3" style={{maxWidth: '18 rem'}}>
                <div className="card-header">{props.user.company.name}<p><small>{props.user.company.catchPhrase}</small></p></div>
                <div className="card-body">
                    <h5 className="card-title">{props.user.name} </h5>
                    <p className="card-text">{props.user.address.city}, {props.user.address.street}, {props.user.address.suite}, {props.user.address.zipcode}</p>
                    <small>Phone:{props.user.phone}  Mail:{props.user.email} </small>
                    <p><small>{props.user.website}</small></p>
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

export default User
