$.validator.addMethod("humanCheck", function(value, element) { 
    // FIXME hardcoded check here
    return this.optional(element) || value == "4"
}, "Seems you're robot or just a baby-kid");

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


$(document).ready(function(){
    //   registerForm 
    $("#registerForm").validate({
        highlight: function (element, errorClass, validClas) { 
            $(element).parents("div[class='clearfix']").addClass("error"); 
        }, 
        unhighlight: function (element, errorClass, validClass) { 
            $(element).parents(".error").removeClass("error"); 
        }, 
        errorElement: 'span', // helps if u are not using the inline labels 

        rules: { 
            websiteName: { required: true, uniqueWebsiteName: true },
            emailAddress: { required: true, email: true, uniqueUserName: true },
            emailConfirm: { equalTo: "#emailAddress" },
            password: { required: true, minlength:6 }, 
            passwordConfirm: { equalTo: "#password" },
            areYouHuman: { required: true, humanCheck: true },
            tosAgree: { required: true, checked: true }
        }
    });

    //   registerForm 

})