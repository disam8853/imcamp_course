import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import SelectionData from '../component/SelectionData'

const axios = require('axios');
//import '../css/main.css'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 introScreen")
    document.title="個人檔案"
    this.state={
      token: localStorage.getItem('token'),
      name: "",
      school: "",
      section: [],
      redirect: false
    };
  }

  

  componentWillMount() {
    if (!this.state.token) {
      alert("please sign in!")
      this.setState({redirect: true});
    }

    axios.post('/api/profile', {
        token: this.state.token
      })
      .then(response => {
        console.log(response.data.section);
        this.setState({
          name: response.data.name,
          school: response.data.school,
          section: response.data.section
        });
      })
      .catch(error => {
        console.log(error);
        alert('請重新登入！')
        this.setState({redirect: true});
      });
  }

  render() {
    let fakeResult=[
      "機器學習",
      "統計",
      "python"
    ]
    if (this.state.redirect) {
      return (<Redirect push to="/"/>)
    } else {
    return (
      <div className='profile'>
        <div className='proHeader'>
          <div className="row">
            <div className="col">
            <h1 style={{fontSize:"50px"}}>個人主頁</h1>
            </div>
            <div className="col">
              <div style={{marginLeft:"75%"}}>
                <h4 style={{marginBottom:"15px"}}>姓名：{this.state.name}</h4>
                <h4 >學校：{this.state.school}</h4>
              </div>
            </div>
          </div>
        </div>
        
        <hr/> 
          <div className='proBody'>
            <div className="row">
              <div className="col-6">
                <h2>選課資料：</h2>

                  {
                    this.state.section.map((data, i) => {
                    return(
                    <div className='my-3' key={i} style={{marginLeft:"30px"}}>
                      <h4 className='mb-2'>第{i+1}時段：</h4>
                        <SelectionData data={data} />
                    </div>)
                  })}
              </div>
              <div className="col-6">
                <h1>分發結果</h1>
                {fakeResult.map((data, i) => {////////////也是course_name格式 所以fake資料室錯的
                    return(
                      <div className='my-3' key={i} style={{marginLeft:"30px"}}>
                        <h4 className='mb-2'>第{i+1}時段：{data.course_name}</h4> 
                      </div>)
                  })}
              </div>
            </div>
        </div>
        <hr />

        <div className="row bottomButton">
              <div className="col-11">
              </div>
              <div className="col-1">
                <Link to='select' className='btn btn-primary'style={{padding:"15px 20px"}}>選課去</Link>
              </div>
            </div>
      </div>
    )}
  }
}
//

export default Profile