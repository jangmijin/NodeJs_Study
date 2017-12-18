var express = require('express');
//사용자가 전송한 post 방식의 데이터를 캐치하는 방법 그 작업하기 위해 body parser라는 모듈 설치
var bodyParser= require('body-parser');
var fs = require('fs');
var app = express();
//기억이 안 날때 google에 bodyparser express 검색 사용 예제 참고
//app이 bodyparser를 use한다
app.use(bodyParser.urlencoded({ extended: false }))
app.locals.pretty = true;//템플릿 엔진에서 사용한 html 코드들을 들여쓰기 및 정렬
//set 세팅 해줄때
app.set('views','./views_file');
app.set('view engine','jade');
//get 라우터
app.get('/topic/new', function(req,res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new',{topics:files});
  });
});
//주소를 직접 치고 들어오는 것을 get이라고 한다 get 라우터
app.get(['/topic','/topic/:id'],function(req,res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      //id 값이 있을때
      fs.readFile('data/'+id, 'utf8', function(err,data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      });
    } else {
      //id 값이 없을때
      res.render('view', {topics:files, title:'Welcome', description:'Hello Javascript for server'});
    }
  });
});
/* 중복코드 제거전
app.get('/topic/:id', function(req,res){
  var id = req.params.id;
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    //파일 읽을 때 readFile메서드를 쓴다
    fs.readFile('data/'+id, 'utf8', function(err,data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('view', {topics:files, title:id, description:data});
    });
  });
});
*/
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title,description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    //사용자가 작성한 상세보기 페이지로 보낸다
    res.redirect('/topic/'+title);
  });
});
app.listen(3000, function(){
    console.log('conneted 3000port')
});
