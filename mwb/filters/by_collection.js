function(doc, req){
    // we don't do any checks here, as document ID is apparently in form <TYPE>:<USER_NAME>:<WEBSITE_NAME>
    var docId = doc._id.split(':');
    var type = docId[0];
    var user = docId[1];
    if(req.query && req.query.collection && req.userCtx.name == user && req.query.collection == type){
        return true;
    } else {
        // do nothing
        return false;
    }
}