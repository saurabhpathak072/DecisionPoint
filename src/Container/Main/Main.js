import React, { Component } from 'react';
// import classes from './Main.module.css';
import Axios from 'axios';

import {Route,Switch} from 'react-router-dom';
import Users from '../../Components/Users/Users';
import Autocomplete from '../../Components/AutoCompleteText/Autocomplete';
import Loader from '../../UI/Loader/Loader';
import UserPost from '../UserPost/UserPost'; 

class Main extends Component {
    state={
        users:null,
        name:null,
        post:null
    }
    componentDidMount(){
       this.getSearch();
    }

    getSearch = (name)=>{
       
        if(name){
            Axios.get(`https://jsonplaceholder.typicode.com/users?name=${name}`)
            .then(res=>{
                if(res.data.length === 0){
                    
                    Axios.get(`https://jsonplaceholder.typicode.com/users?id=${name}`)
                    .then(res2=>{
                        
                        if(res2.data.length===0){
                            alert("User is not exist");
                        }
                        this.setState({
                            users:res2.data,
                        });
                    })
                    .catch(err=>console.log(err))
                }
                this.setState({
                users:res.data,
                
            });
        
            })
            .catch(error=>console.log("Get user error",error));
        }else{
            Axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res=>{
                let name=[],id=[],uname=[],i=0;
                for(i=0;i<res.data.length;i++){
                    name[i]=res.data[i].name;
                    id[i]=res.data[i].id
                }
                this.setState({
                users:res.data,
                name,
                id,
                uname
            });
        
            }).then(
                Axios.get(`https://jsonplaceholder.typicode.com/posts`)
                .then(resp=>{
                    this.setState({
                        post:resp.data
                    })
                })
            )
            .catch(error=>console.log("Get user error",error));
        }
        
    }

    

    searchuser = async (name)=>{
        
        await this.setState({
            serName:name
        });
        await this.getSearch(this.state.serName);
        
        
    }
    render() {
       
        return (
            <div className="container-fluid">
                <h1>Main</h1>

                <Autocomplete search={(uname)=>this.searchuser(uname)} suggestions={this.state.name}  userid={this.state.id}/>
                
                <Switch>
                {this.state.users ? <Route path="/" exact render={()=> <Users users={this.state.users} post={this.state.post}/>}/>:<Loader />}
                    <Route path="/post" exact render={()=><UserPost/>}/>
                </Switch>
            </div>
        )
    }
}

export default Main
