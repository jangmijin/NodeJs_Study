var express = require('express');
var app = express();
app.locals.pretty = true;//템플릿 엔진에서 사용한 html 코드들을 들여쓰기 및 정렬
/* 템플릿 엔진 사용법*/
//nodejs 수정할 때마다 안켜도 하는 법 supervisor 입력 좀 더 익숙해지면 사용할거임!
app.set('view engine' , 'jade');
app.set('views','./views');
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Jade'});
});
app.use(express.static('public'));
//query 객체의 사용법
app.get('/topic' ,function(req, res){
  //각각의 값을 주고 싶을때
  res.send(req.query.id+','+req.query.name);
})
//http://localhost:3000/
app.get('/',function(req, res){
  res.send('hello home page');
});
app.get('/route', function(req ,res){
  res.send('hello router,<img src ="/search.gif"/>')
})
app.get('/dynamic', function(req, res){
  var lis ='';
  for(var i=0; i<5; i ++){
    lis = lis + '<li>cording</li>'
  }
  var time = Date();
  var output = `<!DOCTYPE>
  <html>
    <head>
      <meta charset="utf-8" />
      <title></title>
    </head>
    <body>
      hello, Dnaymic!
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output);
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
