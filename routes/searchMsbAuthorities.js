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
    Title:'MsbAuthoritiesSearch',
    Heading:'MsbAuthorities',
    Username:{label :'Username'},
    Authority:{label :'Authority'},
    MsbAuthorities:{Heading:'MsbAuthorities',
        Username:{header:'Username'},
        Authority:{header:'Authority'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    if(jsonObj.rowid===undefined) jsonObj.rowid = 0;
    req.session.previouspath = 'searchMsbAuthorities?'+req._parsedUrl.query;
    dao.searchMsbAuthorities(jsonObj,function(err,rows) {
        parameter = {
            session: req.session,
            cookies: req.cookies,
            resource: appresource,
            dateFormat: dateFormat,
            records: rows,
        }
        res.render('MsbAuthoritiesSearchPage',parameter);
        console.log(parameter);        
    })
});

module.exports = router;
