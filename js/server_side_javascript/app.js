var express = require('express');
var bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({ extended: false}));
app.get('/form', function(req, res){
  res.render('form');//render 템플릿 파일 할때
});
app.get('/form_receiver', function(req,res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description
  res.send(title+','+description);
});
//시맨틱 url로 변경할때 :경로명, query 대신 params 를 적어준다!
app.get('/topic' ,function(req, res){
  var topics = [
    'Javascript is.....',
    'Nodejs is......',
    'Express is......'
  ];
  var output = `
    <a href="/topic?id=0">JavaScript</a></br>
    <a href="/topic?id=1">Nodejs</a></br>
    <a href="/topic?id=2">Express</a></br></br>
    ${topics[req.query.id]}
  `
  res.send(output);
});
app.get('/topic/:id/:mode' , function(req, res){
  res.send(req.params.id+","+req.params.mode)
});
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
