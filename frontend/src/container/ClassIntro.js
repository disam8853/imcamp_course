import React from 'react'
import {Link} from 'react-router-dom'
import ClassPanel from '../component/ClassPanel'

class ClassIntro extends React.Component{
    constructor(props){
        super(props)
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 introScreen")
        document.title="課程介紹"
        this.state = {
          courseTitle:"",
          courseDescription:["機器學習是人工智慧的一個分支。人工智慧的研究歷史有著一條從以「推理」為重點，到以「知識」為重點，再到以「學習」為重點的自然、清晰的脈絡。顯然，機器學習是實現人工智慧的一個途徑，即以機器學習為手段解決人工智慧中的問題。機器學習在近30多年已發展為一門多領域交叉學科，涉及概率論、統計學、逼近論、凸分析、計算複雜性理論等多門學科。機器學習理論主要是設計和分析一些讓電腦可以自動「學習」的演算法。機器學習演算法是一類從資料中自動分析獲得規律，並利用規律對未知資料進行預測的演算法。因為學習演算法中涉及了大量的統計學理論，機器學習與推斷統計學聯絡尤為密切，也被稱為統計學習理論。演算法設計方面，機器學習理論關注可以實現的，行之有效的學習演算法。很多推論問題屬於無程式可循難度，所以部分的機器學習研究是開發容易處理的近似演算法。機器學習已廣泛應用於資料探勘、電腦視覺、自然語言處理、生物特徵辨識、搜尋引擎、醫學診斷、檢測信用卡欺詐、證券市場分析、DNA序列測序、語音和手寫辨識、戰略遊戲和機器人等領域。",
          "機器學習有下面幾種定義：機器學習是一門人工智慧的科學，該領域的主要研究物件是人工智慧，特別是如何在經驗學習中改善具體演算法的效能。機器學習是對能通過經驗自動改進的電腦演算法的研究。機器學習是用資料或以往的經驗，以此最佳化電腦程式的效能標準。一種經常參照的英文定義是：A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."]
        }
    }

    handlePanelItemOnclick = (e)=>{
      this.setState({courseTitle:e.target.innerHTML})
    }

    render(){
        let test={
          name:"大選修",
          classes:["機","機器","機器學"]
        }
        let tests=[test,test,test]
        let categoryPanel = tests.map((category,index)=>{
          return(
            <ClassPanel category={category} id={index} key={index} panelItemOnclick={this.handlePanelItemOnclick}/>
          )
        })
        let description = this.state.courseDescription.map((p,index)=>{
          return(
            <p className="courseDescription" key={index}>
                  {p}
            </p>
          )
        })
        return(
            <React.Fragment>
            <div className="titleWrapper">
              <h1>課程介紹</h1>
            </div>
            <div className="row main">
              <div className="col-2 introduceLeftCol">
                <div className="panel-group" id="accordion">
                  {categoryPanel}
                </div>
              </div>
              <div className="col-10 introduceRightCol">
                <h1 id="courseTitle">{this.state.courseTitle}</h1>
                {description}
              </div>
            </div>
            <div className="row bottomButton">
              <div className="col-11">
              </div>
              <div className="col-1" id="goToSelect">
                <Link to="/select"><h3 className="text" style={{color:"black", padding:"10px 0"}}>選課去</h3></Link>
              </div>
            </div>
            </React.Fragment>
        )
    }
}

export default ClassIntro