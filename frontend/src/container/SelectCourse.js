import React from 'react'
import { Link } from 'react-router-dom'

class SelectCourse extends React.Component{
    constructor(props){
        super(props)
        document.title="選課系統"
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 selectScreen")
    }
    render(){
        return(
            <React.Fragment>
                <div class="titleWrapper">
              <h1>選課系統</h1>
            </div>
            <div class="userInfoWrapper">
              <h5 class="userInfo h4">歡迎回來，<Link to='/profile' token={this.props.token} className='h4 mr-5 mt-4 bg-highlight text-info'>{localStorage.getItem('name')}</Link></h5>
            </div>
            <div class="row main">

              <div style={{width:"100%"}}>

                <button class="btn btn-primary btn-lg btn-block category" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapseExample">
                  Button with data-target
                </button>
                 <div class="collapse" id="collapse1">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-2 leftCol">
                        <ul class="nav flex-column">
                          <li class="nav-item">
                            <a class="nav-link active" >Active</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" >Link</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link">Link</a>
                          </li>
                          </ul>
                      </div>
                      <div class="col-10 rightCol">
                        34
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary btn-lg btn-block category" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapseExample">
                  Button with data-target
                </button>
                 <div class="collapse" id="collapse2">
                  <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                  </div>
                </div>

                <button class="btn btn-primary btn-lg btn-block category" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapseExample">
                  Button with data-target
                </button>
                 <div class="collapse" id="collapse3">
                  <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                  </div>
                </div>

              </div>

            </div>
            </React.Fragment>
        )
    }
}
export default SelectCourse