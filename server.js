"use strict";
const fetch= require('node-fetch')
const http = require('http')
const url = require('url')
function creatjsonurl(videoid){
  var utid = 'LqINEj7DmmICATzT3tJb8EFy'
  var time=Date.parse(new Date())
 return `https://ups.youku.com/ups/get.json?vid=${videoid}&ccode=0401&client_ip=192.168.1.1&utid=${utid}&client_ts=${time}`
}

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf8','Access-Control-Allow-Origin':'*'});
  let getobj=url.parse(req.url, true).query
  if (getobj.youku) {
      console.log('youku:'+getobj.youku)
      let yurl=creatjsonurl(getobj.youku)
      fetch(yurl, {
          method: "GET",
          headers: {
            "referer":"http://v.youku2.com",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => res.text())
        .then(body => res.end(body));
  }else{
      res.end('{"success":"0","data":"dont find youku"}')
  }

}).listen(5270);
