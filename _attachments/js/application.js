$(document).ready(function(){
    // initializing couchdb

    // FIXME: this stuff is a subject to change
    // as production URLs will probably not contain DB name or design 
    var path = unescape(document.location.pathname).split('/'),
    design = path[3], dbname = path[1]

    $.db = $.couch.db(dbname);
    ////////////////////////////////////////////////

    // enerjizing buttons
    // pull-right,pull-left buttons submitting the form
    $(".pull-right,.pull-left") .click(function(e){
        $("form").submit()
        e.preventDefault()
    })

    // processing registration form
    $("#registerForm").submit(function(e){
        var form = $(this).serializeArray();
        console.log(form)
        //$.db.signup()
    })
});