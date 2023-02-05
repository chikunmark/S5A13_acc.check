const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const login_schema = require('./models/login_schema')
let loginData = {}
let dNone = 'd-none'

// (下1) 尚未做 routes refactoring，先不用它
// const routes = require('./routes/index') // 可不寫 /index，因為預設會去找它
require('./config/mongoose')

const port = process.env.PORT || 8080
const app = express()

// app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 舊版本寫法
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) // 新版本寫法
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// app.use(routes) // 開始 refactor 後再把 routes 打開

app.get('/', (req, res) => {
  res.render('login', { dNone })
})

app.post('/', (req, res) => {
  loginData = req.body
  // let abc = 'before'
  // console.log('loginData', loginData)
  // const aaa = login_schema.find().lean()
  // console.log('測試 const 如下')
  // console.log(aaa)
  login_schema
    .find({ email: loginData.email, password: loginData.password })
    .lean(acc => console.log(`lean 裡面的結果 ${acc}`)) // 顯示不出東西，但好像也沒影響，先留著提醒自己 (菸)
    .then(acc => {
      // console.log('搜尋結果如下')
      // console.log(acc[0])
      // console.log('布林結果如下')
      // console.log(Boolean(acc[0]))
      // console.log(acc !== []) // 這個等號有問題 (因 JS 判定方法)，只要是陣列，acc 就會一直不等於 []
      if (Boolean(acc[0])) {
        dNone = 'd-none'
        return res.redirect('/welcome')
      } else {
        dNone = ''
        // const dNone = document.querySelector('.d-none')
        // dNone.classList.toggle('d-none')
        return res.redirect('/') // 先跳回首頁，剩下之後改
      }
      // abc = acc[0].firstName
      // console.log('inside abc 值', abc)
    })
  // console.log('outside abc 值', abc)
})

app.get('/welcome', (req, res) => {
  login_schema
    .find({ email: loginData.email, password: loginData.password })
    .lean()
    .then(acc => {
      // console.log('welcome 試試')
      return res.render('welcome', { firstName: acc[0].firstName })
    })
})

app.listen(port, () => {
  console.log(`App is running on http://localhos:${port}`)
})
