import React from 'react'

class TeacherPanel extends React.Component{

    constructor(props){
        super(props)
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 selectScreen")
        document.title="學生資訊"
        this.state={
            students:"",
            courseID:"",
            teacherAccount:""
        }
    }

    handleCourse = (e)=>{
        this.setState({courseID:e.target.id})
        console.log(e.target.id)
    }
    render(){
        let fakeStu=[
            {
              name:"Kevin",
              school:"Hsinchu Senior High",
              email:"kevin@gmail.com "
            },
            {
              name:"Yunchia",
              school:"Taipei First Girl High School",
              email:"yunchia@gmail.com"
            },
            {
              name:"Cupid",
              school:"Bad School :(",
              email:"cupid@gmail.com"
            }
          ]
        let fakeClass=[{
            name:"機器學習",
            id:"5"
        },{
            name:"音樂作品欣賞",
            id:"1"
        },{
            name:"統計",
            id:"2"
        }]
        let students = fakeStu.map((student,index)=>{
            return(
                <div key={index}>
                    <button class="btn btn-secondary btn-lg btn-block student" type="button" data-toggle="collapse" data-target={"#stu"+index} aria-expanded="false" aria-controls="collapseExample">
                        {student.name}
                    </button>
                    <div class="collapse" id={"stu"+index}>
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
        let courseList = fakeClass.map((clas, index)=>{
            return(
                <button className="button4" id={clas.id} key={index} onClick={this.handleCourse}>{clas.name}</button>
            )
        })
        return(
            <React.Fragment>
                <div class="titleWrapper">
                    <h1>學生資訊</h1>
                </div>
                <div class="userInfoWrapper">
                    <h5 class="userInfo">歡迎回來，XXX</h5>
                </div>
                <div className="row button-group">
                    {courseList}
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