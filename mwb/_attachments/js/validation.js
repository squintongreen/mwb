$.validator.addMethod("humanCheck", function(value, element) { 
    // FIXME hardcoded check here
    return this.optional(element) || value == "4"
}, "Sorry that's wrong. Please try again.");

$.validator.addMethod("uniqueWebsiteName", function(value, element) { 
    value = value.replace(/\s/gi, '-')
    $(element).val(value)
    var isSuccess = false;
    $.ajax({
        url: "/" + $.dbname + "/" + value,
        async: false,
        success: function(doc){
            isSuccess = false;
        },
        error: function(err){
            isSuccess = true;
        }
    })
    return this.optional(element) || isSuccess;
}, "Website name is already taken");

$.validator.addMethod("uniqueUserName", function(value, element) { 
    var isSuccess = false;
    $.ajax({
        url: "/_users/org.couchdb.user:" + value,
        async: false,
        success: function(doc){
            isSuccess = false;
        },
        error: function(err){
            isSuccess = true;
        }
    })
    return this.optional(element) || isSuccess;
}, "User name is already taken");


$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "Please check your input."
);

$(document).ready(function(){
    var defaults = {
        highlight: function (element, errorClass, validClas) { 
            $(element).parents("div[class='clearfix']").addClass("error"); 
        }, 
        unhighlight: function (element, errorClass, validClass) { 
            $(element).parents(".error").removeClass("error"); 
        }, 
        errorElement: 'span', // helps if u are not using the inline labels 
    }

    // registerForm 
    $("#registerForm").validate($.extend(defaults, {
        rules: { 
            websiteName: { required: true, uniqueWebsiteName: true },
            emailAddress: { required: true, email: true, uniqueUserName: true },
            emailConfirm: { equalTo: "#emailAddress" },
            password: { required: true, minlength:6 }, 
            passwordConfirm: { equalTo: "#password" },
            areYouHuman: { required: true, humanCheck: true },
            tosAgree: { required: true, checked: true }
        }
    }));
    // companyPorfile 
    $("#companyProfile").validate($.extend(defaults, {
        rules: { 
            'company-name': { required: true },
            'description': { maxlength: 200 },
            /*
            'street-address': { required: true },p
            'suite': { required: true },
            'city': { required: true },
            'state': { required: true }, */
            'phone': { required: true, regex: /^\([0-9]{3}\)[0-9]*$/ },
            'email': { required: true, email: true }

        }
    }));

    // service
    $("#service").validate($.extend(defaults, {
        rules: {
            'description-1': { maxlength: 200 },
            'description-2': { maxlength: 200 },
            'description-3': { maxlength: 200 },
            'description-4': { maxlength: 200 },
            'description-5': { maxlength: 200 }
        }
    }));


    $(".success").click(function(){
        var allForms = $(this).parents("div.tab-pane").find("form")
        allForms.submit();
    })
})