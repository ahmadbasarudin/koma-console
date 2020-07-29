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
    Title:'MsbVersionSearch',
    Heading:'MsbVersion',
    Name:{label :'Name'},
    Version:{label :'Version'},
    MsbVersion:{Heading:'MsbVersion',
        Name:{header:'Name'},
        Version:{header:'Version'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    if(jsonObj.rowid===undefined) jsonObj.rowid = 0;
    req.session.previouspath = 'searchMsbVersion?'+req._parsedUrl.query;
    dao.searchMsbVersion(jsonObj,function(err,rows) {
        parameter = {
            session: req.session,
            cookies: req.cookies,
            resource: appresource,
            dateFormat: dateFormat,
            records: rows,
        }
        res.render('MsbVersionSearchPage',parameter);
        console.log(parameter);        
    })
});

module.exports = router;