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

    function updateDocList() {
        $.db.view("mwb/all-docs", {
            reduce: false,
            success: function(data){
                // clearning all 
                var all = $("#projects .dropdown-menu li.divider ~ li");
                all.remove();
                $.each(data.rows, function(k, v){
                    $("#projects .dropdown-menu").append(li(a(v.id)));
                });
            }
        });
    };

    updateDocList();

    $("#projects ul li a").live('click', function(){
        $("#websiteId").text($(this).text());
    })

    $("#add-new-site").click(function(){
        var name=prompt('Enter new website name','Name');
        $.db.saveDoc({_id: name, type: 'project'}, {
            success:function(){
                updateDocList();
            }
        })
    });

    // any other form
    $("#publish").click(function(e){
        e.preventDefault = true;

        var forms = {};
        $("form").each(function(){
            var form = {}
            form[$(this).attr('id')] = $(this).serializeObject()
            $.extend(forms, form)
        });

        forms._id =  $("#websiteId").text();
        $.db.openDoc(forms._id, {
            async: false,
            success: function(doc){
                // document exists
                var result_doc = $.extend(doc, forms)
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
                var result_doc = $.extend({}, forms)
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

        return true;
    })

    // serviceAreas

    $("#serviceAreas button").click(function(){
        var cloned = $(this).parents("form").find(".clearfix:last").clone().appendTo($(this).parents("form").find("ul"));
    });
		
});