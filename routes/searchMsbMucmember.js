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
    Title:'MsbMucmemberSearch',
    Heading:'MsbMucmember',
    Roomid:{label :'Roomid'},
    Jid:{label :'Jid'},
    Subscriber:{label :'Subscriber'},
    Nickname:{label :'Nickname'},
    Firstname:{label :'Firstname'},
    Lastname:{label :'Lastname'},
    Url:{label :'Url'},
    Email:{label :'Email'},
    Faqentry:{label :'Faqentry'},
    MsbMucmember:{Heading:'MsbMucmember',
        Roomid:{header:'Roomid'},
        Jid:{header:'Jid'},
        Subscriber:{header:'Subscriber'},
        Nickname:{header:'Nickname'},
        Firstname:{header:'Firstname'},
        Lastname:{header:'Lastname'},
        Url:{header:'Url'},
        Email:{header:'Email'},
        Faqentry:{header:'Faqentry'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    if(jsonObj.rowid===undefined) jsonObj.rowid = 0;
    req.session.previouspath = 'searchMsbMucmember?'+req._parsedUrl.query;
    dao.searchMsbMucmember(jsonObj,function(err,rows) {
        parameter = {
            session: req.session,
            cookies: req.cookies,
            resource: appresource,
            dateFormat: dateFormat,
            records: rows,
        }
        res.render('MsbMucmemberSearchPage',parameter);
        console.log(parameter);        
    })
});

module.exports = router;