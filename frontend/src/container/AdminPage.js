import React from 'react'
import {Redirect} from 'react-router-dom'
import SelectionData from '../component/SelectionData'

const axios = require('axios');

class AdminPage extends React.Component{

    constructor(props){
        super(props)
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 selectScreen")
        document.title="學生資訊"
        this.state={
            token: localStorage.getItem('token'),
            course_name: "",
            students: [],
            redirect: false
        }
    }

    componentWillMount() {
        this.setState({
            token: localStorage.getItem('token')
        });

        if (!localStorage.getItem('token')) {
            this.setState({redirect: true});
        }

        if (this.state.token) {
              axios.get('/api/students')
              .then(response => {
                console.log(response.data.section);
                this.setState({
                  students: response.data
                });
              })
              .catch(error => {
                console.log(error);
                alert('something wrong！')
                this.setState({redirect: true});
              });
        }
    }

    handleCourse = (e)=>{
        this.setState({courseID:e.target.id})
        console.log(e.target.id)
    }
    render(){
        if (this.state.redirect) {
            alert('請重新登入老師帳號！')
            return (<Redirect push to='/'/>)
        }

        // let fakeClass=[{
        //     name:"機器學習",
        //     id:"5"
        // },{
        //     name:"音樂作品欣賞",
        //     id:"1"
        // },{
        //     name:"統計",
        //     id:"2"
        // }]
        let students = this.state.students.map((student,index)=>{
            return(
                <div key={index}>
                    <button class="btn btn-secondary btn-lg btn-block student" type="button" data-toggle="collapse" data-target={"#stu"+index} aria-expanded="false" aria-controls="collapseExample">
                        {student.name}
                    </button>
                    <div class="collapse" id={"stu"+index}>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    {
                                        student.section.map((data, i) => {
                                        return(
                                        <div className='my-3' key={i} style={{marginLeft:"30px"}}>
                                          <h4 className='mb-2'>第{i+1}時段：</h4>
                                            <SelectionData data={data} />
                                        </div>)
                                      })}
                                    <ul class="nav flex-column">
                                    <li class="">
                                        <p class="stuLi">School: {student.school}</p>
                                    </li>
                                    <li class="">
                                        <p class="stuLi">Email: {student.email}</p>
                                    </li>
                                    </ul>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        // let courseList = fakeClass.map((clas, index)=>{
        //     return(
        //         <button className="button4" id={clas.id} key={index} onClick={this.handleCourse}>{clas.name}</button>
        //     )
        // })
        return(
            <React.Fragment>
                <div class="titleWrapper">
                    <h1>學生資訊</h1>
                </div>
                <div class="userInfoWrapper">
                    <h5 class="userInfo">歡迎回來，管理員</h5>
                </div>
                <div class="row main">

                    <div style={{width:"100%"}}>
                        {students}
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default AdminPage