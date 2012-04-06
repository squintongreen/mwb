function(doc, req){
    // we don't do any checks here, as document ID is apparently in form <TYPE>:<USER_NAME>:<WEBSITE_NAME>
    var docType = doc._id.split(':');
    var type = docType[0];
    var user = docType[1];
    if(req.query && req.query.collection && req.userCtx.name == user && req.query.collection == type){
        return true;
    } else {
        // do nothing
        return false;
    }
}