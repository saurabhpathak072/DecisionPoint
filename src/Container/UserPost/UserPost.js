import React, {useState,useEffect} from 'react';
import classes from './UserPost.module.css';
import {withRouter} from 'react-router-dom';
 import Loader from '../../UI/Loader/Loader';
import Axios from 'axios';


function UserPost(props) {
   
    let userID=0;
    const[post,setPost]= useState([]);
    useEffect(
        ()=>{
            
            Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
            .then(resq=>{
                setPost(resq.data);
            }).catch(error=>console.log(error));
        },[userID]
    );
    const query = new URLSearchParams(props.location.search);
    
    for(let param of query.entries()){
        if(param[0]==='username'){
            userID=param[1];
        }else{
            userID=0;
        }
        
    }
    
  
    let postList = [];
    console.log(props);
        postList =  post.map(p=>{
        return (
            <div key={p.id} className={classes.userpost}>
            <div  className="list-group">
                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{p.title}</h5>
                        <small>{p.id}</small>
                    </div>
                    <p className="mb-1">{p.body}</p>
                    <small>Donec id elit non mi porta.</small>
                </a>
            </div>
            </div>
        )
        })
    const goBackPost =()=>{
        props.history.goBack();
    }
    
    return (
        <>
        <button onClick={goBackPost} type="button" class="btn btn-primary">Go Back</button>
         {postList? postList :<Loader />}
        </> 
        )
    }




export default withRouter(UserPost);
