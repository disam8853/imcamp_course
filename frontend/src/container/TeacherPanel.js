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

    render(){
        let fakeInfo=[
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
        let students = fakeInfo.map((student,index)=>{
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
                    <h5 class="userInfo">歡迎回來，XXX</h5>
                    <h5 class="userInfo">您教授的課程是，XXX</h5>
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