import React, { Component } from 'react';
import classes from './Main.module.css';
import Axios from 'axios';

import {Route} from 'react-router-dom';
import Users from '../../Components/Users/Users';
import Autocomplete from '../../Components/AutoCompleteText/Autocomplete';

class Main extends Component {
    state={
        users:null,
        name:null
    }
    componentDidMount(){
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
        
            })
            .catch(error=>console.log("Get user error",error));
    }
    render() {
        console.log(this.state.users)
        return (
            <div className="container-fluid">
                <h1>Main</h1>
                <Autocomplete suggestions={this.state.name}/>
                
                <Route path="/" render={()=> <Users users={this.state.users}/>}/>
            </div>
        )
    }
}

export default Main
