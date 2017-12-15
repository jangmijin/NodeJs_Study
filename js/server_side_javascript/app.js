var express = require('express');
var app = express();
app.use(express.static('public'));
//http://localhost:3000/
app.get('/',function(req, res){
  res.send('hello home page');
});
app.get('/route', function(req ,res){
  res.send('hello router,<img src ="/search.gif"/>')
})
//get 메소드를 라우터라고 부르고 get이하는 일을 라우팅이라고 부른다
app.get('/login', function(req, res){
  res.send('<h1>Login please</h1>');
});
app.get('/main', function(req, res){
  res.send('<ul><li>Nodejs</li><li>express를 이용한 웹 어플리케이션 만들기</li></ul>')
});
app.get('/intro',function(req, res){
  res.send('<h3>express 모듈을 이용해 get 메소드 즉 라우터를 사용하여 페이지를 만들고 응답 메시지도 보내봅니다.</h3>')
})
app.listen(3000, function(){
  console.log('Conneted 3000 port!');
});
