import React from 'react'

const axios = require('axios');

class TeacherPanel extends React.Component{

    constructor(props){
        super(props)
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 selectScreen")
        document.title="學生資訊"
        this.state={
            name: localStorage.getItem('name'),
            token: localStorage.getItem('token'),
            course_name: "",
            students: []
        }
    }

    componentWillMount() {
        this.setState({
            name: localStorage.getItem('name'),
            token: localStorage.getItem('token')
        });

        if (this.state.token) {
              axios.post('/api/teacher/profile', {
                token: this.state.token
              })
              .then(response => {
                console.log(response.data.section);
                this.setState({
                  name: response.data.name,
                  course_name: response.data.course_name,
                  students: response.data.students
                });
              })
              .catch(error => {
                console.log(error);
                alert('請重新登入！')
                this.setState({redirect: true});
              });
        }
    }

    render(){
        let students = this.state.students.map((student,index)=>{
            return(
                <div key={index}>
                    <button class="btn btn-secondary btn-lg btn-block student" type="button" data-toggle="collapse" data-target={"#"+index} aria-expanded="false" aria-controls="collapseExample">
                        {student.name}
                    </button>
                    <div class="collapse" id={index}>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
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
        return(
            <React.Fragment>
                <div class="titleWrapper">
                    <h1>學生資訊</h1>
                </div>
                <div class="userInfoWrapper">
                    <h5 class="userInfo">歡迎回來，{this.state.name}</h5>
                    <h5 class="userInfo">您教授的課程是，{this.state.course_name}</h5>
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

export default TeacherPanel