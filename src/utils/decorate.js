// deal with selection text
//柱状图语法
const barContent =`
\`\`\`echarts
{
    "option": {
        "xAxis": {
            "type": "category",
            "data": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ]
        },
        "yAxis": {
            "type": "value"
        },
        "series": [
            {
                "data": [
                    820,
                    932,
                    901,
                    934,
                    1290,
                    1330,
                    1320
                ],
                "type": "bar"
            }
        ]
    }
}
\`\`\`\n`
//折线图语法
// const lineContent =`
// \`\`\`vis
// layout: line
// data: [
//   { key: 0, value: 45 },
//   { key: 1, value: 100 },
//   { key: 2, value: 70 },
//   { key: 3, value: 20 },
//   { key: 4, value: 30 },
//   { key: 5, value: 80 },
//   { key: 6, value: 10 },
//   { key: 7, value: 60 }
// ]
// \`\`\`
// `
const lineContent=`
\`\`\`echarts
{
    "option": {
        "xAxis": {
            "type": "category",
            "data": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ]
        },
        "yAxis": {
            "type": "value"
        },
        "series": [
            {
                "data": [
                    820,
                    932,
                    901,
                    934,
                    1290,
                    1330,
                    1320
                ],
                "type": "line"
            }
        ]
    }
}
\`\`\`\n`

//饼状图语法
const pieContent =`
\`\`\`echarts
{
    "option": {
      "title" : {
        "text": "某站点用户访问来源",
        "subtext": "纯属虚构",
        "x":"center"
      },
      "tooltip" : {
        "trigger": "item",
        "formatter": "{a} <br/>{b} : {c} ({d}%)"
    },
    "legend": {
      "orient": "vertical",
      "left": "left",
      "data": ["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"]
  },
        "series": [
          {
            "name": "访问来源",
            "type": "pie",
            "radius" : "55%",
            "center": ["50%", "60%"],
            "data":[
                {"value":335, "name":"直接访问"},
                {"value":310, "name":"邮件营销"},
                {"value":234, "name":"联盟广告"},
                {"value":135, "name":"视频广告"},
                {"value":1548, "name":"搜索引擎"}
            ],
            "itemStyle": {
                "emphasis": {
                    "shadowBlur": 10,
                    "shadowOffsetX": 0,
                    "shadowColor": "rgba(0, 0, 0, 0.5)"
                }
            }
        }
        ]
    }
}
\`\`\`\n`
class Decorate {
  constructor(target) {
    this.target = target
  }
  name = "selection decoration"
  target = ""
  type = ""
  option = {}
  result = ""
  getDecoratedText(type, option = {}) {
    this.type = type
    this.option = option
    return this.result = this.calcDecorateText(this.type, option)
  }
  calcDecorateText(type, option = {}) {
    console.log({target:this.target})
    switch (type) {
      case "h1":
        return `\n# ${this.target} \n`
      case "h2":
        return `\n## ${this.target} \n`
      case "h3":
        return `\n###2 ${this.target} \n`
      case "h4":
        return `\n#### ${this.target} \n`
      case "h5":
        return `\n##### ${this.target} \n`
      case "h6":
        return `\n###### ${this.target} \n`
      case "highlight":
        return `==${this.target}==`
      case "square":
        return `${this.target}^2^`
      case "cube":
        return `${this.target}^3^`
      case "checked":
        return `[x] ${this.target}`
      case "uncheck":
        return `[ ] ${this.target}`
      // //TODO:甘特图
      // case "gantt":
      //   return `\`\`\`
      //           gantt
      //           dateFormat YYYY-MM-DD
      //           section S1
      //           T1: 2014-01-01, 9d
      //           section S2
      //           T2: 2014-01-11, 9d
      //           section S3
      //           T3: 2014-01-02, 9d
      //           \`\`\``
      case "catalogue":  //插入目录
        return `[toc]`
      case "bar":
        return barContent
      case "line":
        return lineContent
      case "pie":
        return pieContent
      case "bold":
        return `**${this.target}**\n`
      case "italic":
        return `*${this.target}*`
      case "underline":
        return `++${this.target}++`
      case "strikethrough":
        return `~~${this.target}~~`
      case "unorder":
        return `- ${this.target.replace(/\r|\n/g,"\n- ")}`
      case "order":
        return `1. ${this.target.replace(/\r|\n/g,"\n1. ")}`
      case "quote":
        return `\n> ${this.target}\n`
      case "hr":
        return `\n---\n`
      case "inlinecode":
        return `\`${this.target}\``
      case "code":
        return `\n\`\`\`\n${this.target}\n\`\`\`\n`
      case "table":
        // return `\n| ${this.target} |  |\n| -- | -- |\n|  |  |\n`
        return this.formatTableText(this.target, option)
      case "image":
        return `![${this.target}](${option.imageUrl || ""})`
      case "link":
        return `[${this.target}](${option.linkUrl || ""})`
      default:
        return `${this.target}`
    }
  }
  formatTableText(target, option) {
    const { row = 2, col = 2 } = option
    let rowHeader = ["|"]
    let rowData = ["|"]
    let rowDivision = ["|"]
    let colStr = ""
    let result = ""
    for (let i = 0; i <= col; i++) {
      rowHeader.push(" Head |")
      rowDivision.push(" --- |")
      rowData.push(" Data |")
    }
    for (let j = 0; j <= row; j++) {
      colStr = colStr + "\n" + rowData.join("")
    }
    result = "\n" + rowHeader.join("") + "\n" + rowDivision.join("") + colStr + "\n"
    return result
  }
}

export default Decorate
