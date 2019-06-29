import React from 'react'
import {Link} from 'react-router-dom'
import ClassPanel from '../component/ClassPanel'

const coursePanel = [
  {
    name:"大選修",
    classes:["統計","作業研究","演算法"]
  },
  {
    name:"小選修",
    classes:["音樂作品欣賞","管理學","計算機概論","機器學習"]
  }
]
const courseDescriptions = {
  "統計":[
    "這門課要講一些什麼內容？",
    "了解統計的本質、應用，並帶領同學們利用程式來進行分析的過程。",
    "不知道是在上什麼QQ？",
    "統計，可小可大。論小，成績名次可一手掌握；論大，則正在正夯的機器學習、大數據分析，皆出自於此。所謂統計，就是針對想探討的議題，進行資料分析，佐以科學及邏輯的驗證，得到具有事實根據的結論。",
    "Instructor: 皇甫立翔",
    "日安，各位。這邊是資管系大三的皇甫立翔，對程式雖然沒有狂熱，但有一定的興趣。領域沒有接觸非常的多，唯獨對統計和網頁有著格外的興趣。",
    "Instructor: 惟慈",
    "嗨，我是惟慈～給我一瓶酒～～～再給我一根菸～～～說走就走 我有的是時間 我不想在未來的日子裡 獨自哭著無法往前～～～～"
  ],
  "作業研究":[
    "這門課要講一些什麼內容？",
    "高二上就會學習線性規劃，因此會先講一些他們解的出來的線性規 劃的實例(變數少的)；之後再帶到多變數的線性規劃，旨不在解出來而是能引領 他們正確列出式子。全程用投影片授課",
    "不知道是在上什麼QQ?",
    "將商業上遇到的問題轉化成數學形式，並透過撰寫程式解決這些數學問題，協助人們做最佳的判斷。例如一家企業該怎麼規畫廠商的配置才能最大化效益、一個烘焙師傅該如何配置生產的蛋糕樹才能最大化收入等等都隸屬於作業研究的範疇！",
    "Instructor: 黃柏叡",
    "嗨大家好我是黃柏叡今年20歲身高178公分體重65公斤喜歡運動聽音 樂尤其是西洋歌曲請大家多多指教>.0"
  ],
  "演算法":[
    "這門課要講一些什麼內容？",
    "本課程中文授課,採用中文教科書何謂「演算法」。演算法為何重要。時間複雜度的概念。一些比較基本的演算法。演算法的應用。",
    "先備知識:",
    "國中數學,一點邏輯.有學過程式更棒,沒有也沒差",
    "Instructor: 劉品枘",
    "就讀於國立台灣大學(臺北帝國大學)資訊管理系,興趣是專心聆聽冠雄老師的課,修過程式設計、演算法、大一國文、大一英文,夢想之一是鹿鳴堂自動倒塌、焚毀",
    "Instructor: 吳禹辰",
    "現年 20 歲,就讀於國立台灣大學資訊管理學系,大一時程式設計 A+,微積分C-,曾因沒有去考英文免修而被迫休了一年大一英文懊悔不已。大學目標有成為資管系最強 BBoy、順利畢業和學會風車,目前已經完成了 1/3。"
  ],
  "音樂作品欣賞":[
    "這門課要講一些什麼內容。",
    "講者會簡單介紹古典音樂史的流變，並在課堂上透過各個年代耳熟能詳的樂曲舉例讓學生清楚感受到風格的轉換與特色，最後以一系列的樂曲導聆帶大家認識作曲家生平和趣事軼聞，甚至介紹古典音樂在近代的發展與化用，以期拉近古典音樂與大眾的距離。",
    "不知道是在上什麼QQ？",
    "一直以來，「古典音樂」似乎經常與難以親近畫上等號，好像沒有學過樂器、上過課的人就聽不出箇中奧妙，甚至電台裡、影視節目中出現的古典音樂相關片段也充滿各種複雜難懂、令人望之卻步的專業術語，講師希望以親切、易懂的方式和各位同學分享古典音樂的歷史流變，並透過耳熟能詳的樂曲舉例說明。",
    "Instructor 黃奕滔",
    "哈囉大家~我叫黃奕滔，是臺大資訊管理學系的二年級學生，也是這次營隊的課程部長，除了程式課業以外，平常也就喜歡彈彈鋼琴、拉拉大提琴，大家看我開的課程就會覺得很明顯了XD"

  ],
  "管理學":[
    "不知道是在上什麼QQ？",
    "各位平常在學校聽老師講課，想必都是教一樣的東西，學習一樣的方法，但在真實的世界中，一切會是這麼一成不便的嗎？例如，老師在課堂上告訴學生，在綠燈出現以前，千萬不能過馬路。這樣的理論，一般而言來說是對的。不過，當學生在路口遇到交通號誌故障時，就不能執著於理論，而必須自行判斷，什麼時候才是過馬路的最佳時機。而個案教學，就是在培養學生如何在各種複雜萬端的企業實況下分析問題，並即時做出可行的決策。",
    "Instructor: 朱家儀",
    "嗨大家好我是資管二的朱家儀，平常吃東西、到處玩等等，希望大家會喜歡這次的課程"
  ],
  "計算機概論":[
    "這門課要講一些什麼內容。",
    "這門科目範圍相當廣，會挑選一些比較重要的東西作為知識補充，成為扎實的基礎，像電腦由什麼零件組成、電腦怎麼運作、二進位、程式語言等等內容。上課方式跟平常在學校一般，但偶爾會輔以一些問答、讓同學有發言/發問的空間。而有些主題會輔以遊戲，幫助同學理解清楚。大多都是相當基礎的知識，僅有二進位等少數主題需要計算，難度並不會太高，同學可以放心、這是堂輕鬆愉快的課程！",
    "不知道是在上什麼QQ？",
    "本課程主要目的在於介紹計算機科學之基本組成元素以及最新重要領域。其中，基本組成元素將涵蓋計算機的資料表示、計算機結構、系統程式、計算機網路、演算法、程式語言、資料結構、計算機圖學與資料庫等。而最新重要領域則將介紹大數據、人工智慧以及高效能計算等。",
    "Instructor: 梁冠群",
    "我是資管二梁冠群，同時也是資管營的課程長之一。課程們都是我與夥伴們，努力思考、花很多時間設計出來的！希望能夠讓同學們透過課程，在資管營學到一些東西。 並且，讓你更加了解「臺大資管」的學生平時究竟在學什麼，如果能讓你喜歡上臺大資管，那就太好了~"
  ],
  "機器學習":[
    "這門課要講一些什麼內容？",
    "什麼是人工智慧,機器學習？ 機器學習的應用。機器如何學習？機器學習的第一個模型-簡單線性迴歸。什麼是 overfitting？機器學習現實中的實例。人工智慧對於道德與現實社會的影響。",
    "先備知識:",
    "你不必會寫程式,這門課不會實作程式,但建議要了解程式運作的基本原理(所以python 課好好學吧~~)。",
    "不知道是在上什麼QQ?",
    "你可能學過程式設計,能夠運用 if, for, while, 來設計簡單的程式,但當我們要設計非常複雜的程式時,我們該如何下手呢?你可以想像,假如我們想要做一個能與人對話的機器人,我們不可能窮舉所有句子來寫一套規則,畢竟連我們自己都不知道語言的規則,甚至在中文裡相同的句子在不同情境裡意思可能不同。如何設計出讓機器自動學習的演算法,就是「機器學習」這個領域在探討的問題,而機器學習是實現人工智慧 (Artifitial Intelligence) 的其中一個方法。",
    "Instructor: 黃資翔",
    "大家好,我是黃資翔,台大資工大二,也是營隊的課程長。我對於資料科學,人工智慧頗有興趣,平常喜歡打德州撲克跟睡覺。你知道為什麼我會出現在資管營嗎?不要問,你會怕~~~"
  ],
  "進階 python":[
    "這門課要講一些什麼內容?",
    "進階 python 所要學的東西是函式（Function），函式的概念就跟大家在數學中所學到的 f(x)，也就是「函數」非常類似，因此，這堂課所要教的觀念並不難，甚至可以說只要你看得懂「若 f(x) = x + 3 則 f(3) = 6」，基本上你就已經理解一半了！ 函式在程式中扮演很重要的角色，它能讓你的程式碼化繁為簡、也比較容易除錯，更重要的是，當你會寫函式後，你的程式碼就可以開始與大家分工合作（作弊、開外掛）了呢！",
    "Instructor: 鄭亦辰(Euni)",
    "大家好，我是經濟雙資管的大三學生鄭亦辰，可以叫我 Euni（E不發音）。目前在橘子蘋果程式設計學苑協助課程開發，也是橘子蘋果的現任講師。我高中的時候是讀社會組，但現在也是很喜歡寫程式：）那我也希望大家能在我的課堂中對程式有多一點有趣的認識，而不是像我高中時一樣覺得寫程式的人都是理工宅宅XD"
  ]
}
class ClassIntro extends React.Component{
    constructor(props){
        super(props)
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 introScreen")
        document.title="課程介紹"
        this.state = {
          courseTitle:"統計",
          courseDescription:[
            "這門課要講一些什麼內容？",
            "了解統計的本質、應用，並帶領同學們利用程式來進行分析的過程。",
            "不知道是在上什麼QQ？",
            "統計，可小可大。論小，成績名次可一手掌握；論大，則正在正夯的機器學習、大數據分析，皆出自於此。所謂統計，就是針對想探討的議題，進行資料分析，佐以科學及邏輯的驗證，得到具有事實根據的結論。",
            "Instructor: 皇甫立翔",
            "日安，各位。這邊是資管系大三的皇甫立翔，對程式雖然沒有狂熱，但有一定的興趣。領域沒有接觸非常的多，唯獨對統計和網頁有著格外的興趣。",
            "Instructor: 惟慈",
            "嗨，我是惟慈～給我一瓶酒～～～再給我一根菸～～～說走就走 我有的是時間 我不想在未來的日子裡 獨自哭著無法往前～～～～"
          ]
        }
    }

    handlePanelItemOnclick = (e)=>{
      this.setState({courseTitle:e.target.innerHTML})
      this.setState({courseDescription: courseDescriptions[e.target.innerHTML]})
    }

    render(){
        let categoryPanel = coursePanel.map((category,index)=>{
          return(
            <ClassPanel category={category} id={index} key={index} panelItemOnclick={this.handlePanelItemOnclick}/>
          )
        })
        let description = this.state.courseDescription.map((p,index)=>{
          if(index % 2 === 1)
            return(
              <p className="courseDescription" key={index}>
                    {p}
              </p>
            )
          else{
            return(
              <h4 className="courseDescription" key={index}>{p}</h4>
            )
          }
        })
        return(
            <React.Fragment>
            <div className="titleWrapper d-flex justify-content-between">
              <h1>課程介紹</h1>
              <Link to='/profile' token={this.props.token} className='h4 mr-5 mt-4 bg-highlight text-info'>{localStorage.getItem('name')}</Link>
            </div>
            <div className="userInfoWrapper">
                <h5 className="userInfo">歡迎回來，XXX</h5>
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