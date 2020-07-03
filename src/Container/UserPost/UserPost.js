import React from 'react';
import {withRouter} from 'react-router-dom';

function UserPost(props) {
    
    const query = new URLSearchParams(props.location.search);
    const posts={};
    let userID=0;
    for(let param of query.entries()){
        console.log(param);
        if(param[0]==='username'){
            userID=param[1];
        }else{
            userID=0;
        }
        
    }
    return (
        <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List group item heading</h5>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small class="text-muted">Donec id elit non mi porta.</small>
        </a>
       </div>
    )
}

export default withRouter(UserPost);
