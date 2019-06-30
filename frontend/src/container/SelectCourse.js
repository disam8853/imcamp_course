import React from 'react'

import { Link, Redirect } from 'react-router-dom'

const axios = require('axios');

class SelectCourse extends React.Component{
    constructor(props){
        super(props)
        document.title="選課系統"
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 selectScreen")
        this.state={
          list1:[
            "作業研究","統計","演算法"
          ],
          list2:[
            "進階 python","音樂作品欣賞","計算機概論"
          ],
          list3:[
            "音樂作品欣賞","機器學習演講","管理學"
          ],
          finish:false,
          loading:false,
          redirect: false
        }
    }
    dragStart = (e)=>{
      let index = e.target.id
      e.dataTransfer.setData("text/plain",index)
    }
    dropped = (e)=>{
      this.cancelDefault(e)

      let oldID = e.dataTransfer.getData('text/plain')
      let oldIndex = oldID.substr(1)
      let targetID = e.target.id
      let targetIndex = targetID.substr(1)

      if(oldID[0] == targetID[0]){
        this.setState((prevState)=>{
          if(oldID[0]=='a'){
            let arr = prevState.list1
            
            let temp = arr[oldIndex]
            arr.splice(oldIndex,1)
            arr.splice(targetIndex,0,temp)
            return({list1:arr})
          }
          else if(oldID[0]=='b'){
            let arr = prevState.list2
            
            let temp = arr[oldIndex]
            arr.splice(oldIndex,1)
            arr.splice(targetIndex,0,temp)
            return({list2:arr})
          }
          else{
            let arr = prevState.list3
            
            let temp = arr[oldIndex]
            arr.splice(oldIndex,1)
            arr.splice(targetIndex,0,temp)
            return({list3:arr})
          }
        })
        e.target.parentElement.setAttribute('class',"nav-item")
      }
    }
    dragover = (e)=>{
      this.cancelDefault(e)
      e.target.parentElement.setAttribute("class", "nav-item-border ")
    }
    dragleave = (e)=>{
      this.cancelDefault(e)
      e.target.parentElement.setAttribute('class',"nav-item")
    }
    cancelDefault = (e)=>{
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    handleSubmit = (e)=>{
      console.log(1)
      this.setState({loading:true})

      // 第二天要改這裡！！！！
      const list = this.state.list1;
      const section_id = 0

      axios.post('/api/selection' , {
        token: localStorage.getItem('token'),
        list: list,
        section_id: section_id
      })
      .then(response => {
        console.log(response.data.section);
        this.setState({finish: true});
      })
      .catch(error => {
        console.log(error);
        alert('請重新登入！')
        this.setState({redirect: true});
      });

    }

    render(){
      if (this.state.redirect) {
        return (<Redirect push to='/' token={this.state.token}/>)
      }
      if(!this.state.finish){
        if(!this.state.loading){
          let list1 = this.state.list1.map((clas,index)=>{
            return(<li className="nav-item" key={index}><a className="nav-link" id={"a"+index} draggable={true} onDragStart={this.dragStart} onDrop={this.dropped} onDragEnter={this.cancelDefault} onDragOver={this.dragover} onDragLeave={this.dragleave} >{clas}</a></li>)
          })
          let list2 = this.state.list2.map((clas,index)=>{
            return(<li className="nav-item" key={index}><a className="nav-link" id={"b"+index} draggable={true} onDragStart={this.dragStart} onDrop={this.dropped} onDragEnter={this.cancelDefault} onDragOver={this.dragover} onDragLeave={this.dragleave} >{clas}</a></li>)
          })
          let list3 = this.state.list3.map((clas,index)=>{
            return(<li className="nav-item" key={index}><a className="nav-link" id={"c"+index} draggable={true} onDragStart={this.dragStart} onDrop={this.dropped} onDragEnter={this.cancelDefault} onDragOver={this.dragover} onDragLeave={this.dragleave} >{clas}</a></li>)
          })
            return(
                <React.Fragment>
                <div className="titleWrapper">
                  <h1>選課系統</h1>
                </div>
                <div className="userInfoWrapper">
                  <h5 className="userInfo">歡迎回來，<Link to='/profile' token={this.props.token} className='h4 mr-5 mt-4 bg-highlight text-info'>{localStorage.getItem('name')}</Link></h5>
                </div>
                <div className="row main">


                  <div style={{width:"100%"}}>

                    <button className="btn btn-primary btn-lg btn-block category" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapseExample">
                      7/2（二）15：00~17：00 大選修
                    </button>
                    <div className="collapse" id="collapse1">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 leftCol">
                            <ul className="nav flex-column">
                              {list1}
                              </ul>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block category" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapseExample">
                    7/4（四）09：00~10：30 小選修
                    </button>
                    <div className="collapse" id="collapse2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 leftCol">
                            <ul className="nav flex-column">
                              {list2}
                              </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="btn btn-primary btn-lg btn-block category" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapseExample">
                    7/4（四）10：30~12：00 小選修
                    </button>
                    <div className="collapse" id="collapse3">
                      <div className="card-body">
                      <div className="row">
                          <div className="col-12 leftCol">
                            <ul className="nav flex-column">
                              {list3}
                              </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  
                </div>
                <div className="row" onClick={this.handleSubmit}>
                  <div className="col-11"/>
                  <div className="col-1" id="goToSelect">
                    <div><h5 className="text" style={{color:"black", padding:"10px 0"}}>提交</h5></div>
                  </div>
                </div>
                
                </React.Fragment>
            )
        }
        else{
          return(
            <div style={{"height":"30vh"}}>
              <div className="cssload-thecube" style={{"marginTop":"10vh"}}>
                <div className="cssload-cube cssload-c1"></div>
                <div className="cssload-cube cssload-c2"></div>
                <div className="cssload-cube cssload-c4"></div>
                <div className="cssload-cube cssload-c3"></div>
              </div>
              <h1 style={{"textAlign":"center",marginTop:"10vh"}}>Sending...</h1>
            </div>
          )
        }
      }
      else{
        return(
          <div>
              <h1 style={{"textAlign":"center","height":"30vh", "margin-top":"20vh"}}>已收到您的提交</h1>
              <Link to='/profile' className="btn btn-primary btn-lg mx-auto d-block">回個人頁面</Link>
          </div>
        )
      }
    }
}
export default SelectCourse