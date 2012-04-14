$.validator.addMethod("humanCheck", function(value, element) { 
    // FIXME hardcoded check here
    return this.optional(element) || value == "4"
}, "Sorry that's wrong. Please try again.");

$.validator.addMethod("uniqueWebsiteName", function(value, element) { 
    value = value.replace(/\s/gi, '-')
    $(element).val(value)
    var isSuccess = false;
    $.ajax({
        url: String.format("/{0}/com.scanshowsell.website:{1}", Backbone.couch_connector.config.db_name, value),
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
    $('form').validate({

        onekyup: false, // FIXME this setting does not work for some reason
        ignore: ":not(:visible),:disabled,input[type=hidden]",
        wrapper: 'span class="error"',                                                                                 
        meta: 'validate',
        highlight: function(element, errorClass, validClass) {
            if (element.type === 'radio') {
                this.findByName(element.name).addClass(errorClass).removeClass(validClass);
            } else {
                $(element).addClass(errorClass).removeClass(validClass);
            }

            // Show icon in parent element
            var error = $(element).parent().find('span.error');

            error.siblings('.icon').hide(0, function() {
                error.show();
            });
        },
        unhighlight: function(element, errorClass, validClass) {
            if (element.type === 'radio') {
                this.findByName(element.name).removeClass(errorClass).addClass(validClass);
            } else {
                $(element).removeClass(errorClass).addClass(validClass);
            }

            // Hide icon in parent element
            $(element).parent().find('span.error').hide(0, function() {
                $(element).parent().find('span.valid').fadeIn(200);
            });
        }
    });
    $(".success").click(function(){
        var allForms = $(this).parents("div.tab-pane").find("form")
        allForms.submit();
    })
})