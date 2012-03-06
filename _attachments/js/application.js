$(document).ready(function(){
    // initializing couchdb

    // FIXME: this stuff is a subject to change
    // as production URLs will probably not contain DB name or design 
    var path = unescape(document.location.pathname).split('/')

    $.design = path[3];
    $.dbname = path[1];

    $.db = $.couch.db($.dbname);
    ////////////////////////////////////////////////

    // enerjizing buttons
    // pull-right,pull-left buttons submitting the form
    $(".pull-right,.pull-left") .click(function(e){
        // submitting the ONLY form on the page
        var ret = $("form").submit();
        console.log(ret);
        e.preventDefault();
        return false;
    })


    // processing registration form
    $("#registerForm").submit(function(e){
        var form = $(this).serializeObject();
        var user_doc = {
            name: form.emailAddress,
            email: form.emailAddress
        };

        console.log(user_doc)
        $.couch.signup(user_doc, form.password, {
            success: function(res){
                assert(res.ok == true);
                window.location.replace("wizard.html")
            }
        });

    })
});