function(doc) {
    // document _id is in form
    // <TYPE>:<WEBSITE_NAME>
    // e.g. com.scanshowsell.website:my_first_website
    // we're returning <TYPE>:<USER_NAME> as the key
    var docType = doc._id.split(":");
    var key = docType[0] + ":" + doc.owner
    emit(key, doc);
};