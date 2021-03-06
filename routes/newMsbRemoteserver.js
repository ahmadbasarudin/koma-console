/*
 * script route generated by KOMA
 * @author : Yan Yan Purdiansah
 */    
var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');    
var database = require('./dao');
var dao = new database.Dao();    
var sessionChecker = require('./security');
var appresource = {
    Title:'MsbRemoteserverNew',
    Heading:'MsbRemoteserver',
    Xmppdomain:{label :'Xmppdomain'},
    Remoteaddress:{label :'Remoteaddress'},
    Remoteport:{label :'Remoteport'},
    User:{label :'User'},
    Password:{label :'Password'},
    Permission:{label :'Permission'},
    }

router.get('/', sessionChecker, function(req, res, next) {
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
        statusCode:100,
        statusMessage:'',        
        record:{xmppdomain:'',
        remoteaddress:'',
        remoteport:'',
        user:'',
        password:'',
        permission:'',
        }
    }
    res.render('MsbRemoteserverNewPage',parameter);
    console.log(parameter);
});
router.post('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.body;
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
    }    
    dao.newMsbRemoteserver(jsonObj,function(err,rows) {
        if(err==null){
            parameter.statusCode = 200;
            parameter.statusMessage = 'Successfully created';
        }else{
            parameter.statusCode = err.code;
            parameter.statusMessage = err.message;
        }
        parameter.record = jsonObj;
        res.render('MsbRemoteserverNewPage',parameter);
        console.log(parameter);        
    });
});

module.exports = router;
