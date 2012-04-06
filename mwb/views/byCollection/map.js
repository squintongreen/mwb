function(doc) {
    // document _id is in form
    // <TYPE>:<USER_NAME>:<WEBSITE_NAME>
    // e.g. com.scanshowsell.website:archer:my_first_website
    // we're returning type as a key
    var docType = doc._id.split(":");
    emit(docType[0], doc);
};