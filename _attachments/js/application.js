$(document).ready(function(){
    // initializing couchdb

    // FIXME: this stuff is a subject to change
    // as production URLs will probably not contain DB name or design 
    var path = unescape(document.location.pathname).split('/')
	
	$('.tabs').tabs();
	$('#fileupload').fileupload();	
		
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


    $.websiteId = $("#websiteId").data("id");

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
    // any other form
    $("form").not("#registerForm").submit(function(e){
        e.preventDefault = true;
        var form = $(this).serializeObject();
        form._id = $.websiteId;
        $.db.openDoc($.websiteId, {
            async: false,
            success: function(doc){
                // document exists
                var result_doc = $.extend(doc, form)
                $.db.saveDoc(result_doc, {
                    async: false,
                    success: function(ok){
                        console.log(ok)
                    }, 
                    error: function(err){
                        console.log(err)
                    }
                })
            },
            error: function(err){
                // document does not exists
                var result_doc = $.extend({}, form)
                $.db.saveDoc(result_doc, {
                    async: false,
                    success: function(ok){
                        console.log(ok)
                    }, 
                    error: function(err){
                        console.log(err)
                    }
                })
            }
        })

        //return true;
    })

    // serviceAreas

    $("#serviceAreas button").click(function(){
        var cloned = $(this).parents("form").find(".clearfix:last").clone().appendTo($(this).parents("form").find("ul"));
    });
		
});