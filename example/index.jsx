import React from 'react';
import ReactDOM from 'react-dom';
import MdEditor from '../src/index.js';
// import MdEditor from '../lib/index.js'
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji' //支持表情包
import subscript from 'markdown-it-sub' //下标
import superscript from 'markdown-it-sup'  //上标
import footnote from 'markdown-it-footnote' //支持锚点链接，例如-》标记：Footnote 1 link[^first]，跳转：[^first]: Footnote **can have markup** 
import deflist from 'markdown-it-deflist' //支持列表标签<dl>
import abbreviation from 'markdown-it-abbr' //支持 <abbr title="">...</abbr>,效果:虚线下标、鼠标放上去有注释
import insert from 'markdown-it-ins'//支持ins标签 下划线
import mark from 'markdown-it-mark' //支持mark标签 高亮
import tasklists from 'markdown-it-task-lists' //支持任务列表，如下[x]代表已经打勾
// - [ ] Mercury
// - [x] Venus
// - [x] Earth (Orbit/Moon)
// - [x] Mars
// - [ ] Jupiter
// - [ ] Saturn
// - [ ] Uranus
// - [ ] Neptune
// - [ ] Comet Haley
import toc from 'markdown-it-toc-gb'  //支持目录自动生成
import container from 'markdown-it-container'
import checkbox from 'markdown-it-checkbox'
// import MermaidPlugin  from 'markdown-it-mermaid'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
// import 'highlight.js/styles/github.css'
import content from './content.js';
import './index.less';

// import vis from 'markvis';
// const d3 = require('d3')  //坑 d3的包版本要4.2.2

const MOCK_DATA = content
import markdownItCharts from '../src/plugins/markdown-it-echarts';  //自定义echarts插件
class Demo extends React.Component {

  mdEditor = null

  mdParser = null

  constructor(props) {
    super(props)
    // initial a parser
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {}
        }    
        return '' // use external default escaping
      }
    })  
    // .use(vis,{d3})
    .use(emoji)  //使用插件
    .use(subscript)
    .use(superscript)
    .use(footnote) 
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    .use(tasklists, { enabled: this.taskLists })
    .use(toc)
    .use(container,'warning')
    .use(checkbox)
    // .use(MermaidPlugin)
    .use(markdownItCharts) //charts
   
  }

  handleEditorChange = ({ html, text }) => {
    // console.log('handleEditorChange', text)
  }

  //图片上传
  handleImageUpload = (file, callback) => {  
    const reader = new FileReader()
    reader.onload = () => {
      const convertBase64UrlToBlob = (urlData) => {
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], { type: mime })
      }
      const blob = convertBase64UrlToBlob(reader.result)
      setTimeout(() => {
        // setTimeout 模拟oss异步上传图片
        // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
        const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'  //图片地址
        callback(url)
      }, 1000)
    }
    reader.readAsDataURL(file)
  }

  //获取markdown的值
  handleGetMdValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getMdValue())
    }
  }

  //获取html的值
  handleGetHtmlValue = () => {
    if (this.mdEditor) {
      console.log("hmtl",{html:this.mdEditor.getHtmlValue()})
      alert(this.mdEditor.getHtmlValue())
    }
  }

  render() {
    return (
      <div className="demo-wrap">
        <h3>react-markdown-editor-lite demo</h3>
        <nav className="nav">
          <button onClick={this.handleGetMdValue} >getMdValue</button>
          <button onClick={this.handleGetHtmlValue} >getHtmlValue</button>
        </nav>
        <div className="editor-wrap" style={{ marginTop: '30px' }}>
          <MdEditor
            ref={node => this.mdEditor = node}
            value={MOCK_DATA}
            style={{ height: '500px', width: '100%' }}
            renderHTML={(text) => this.mdParser.render(text)}
            config={{
              view: {
                menu: true, //控制是否显示导航条
                md: true,
                html: true
              },
              table: {  //控制行列
                maxRow: 5,
                maxCol: 6
              },
              imageUrl: 'https://octodex.github.com/images/minion.png',
            }}
            onChange={this.handleEditorChange}
            onImageUpload={this.handleImageUpload}
          />
        </div>
        {/* <div style={{marginTop: '30px'}}>
          <MdEditor
            value={MOCK_DATA}
            style={{height: '200px', width: '100%'}}
            config={{
              view: {
                menu: true,
                md: true,
                html: true
              },
              imageUrl: 'https://octodex.github.com/images/minion.png'
            }}
            onChange={this.handleEditorChange} 
          />  
        </div> */}
      </div>
    )
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
)