$(document).ready(function(){
    // processing registration form
    $("#registerForm").isHappy({
        submitButton: ".btn",
        fields: {
            // reference the field you're talking about, probably by `id`
            // but you could certainly do $('[name=name]') as well.
            '#websiteName': {
                required: true,
                message: 'Website name should not be empty and should be unique'
            },
            '#emailAddress': {
                required: true,
                message: 'How are we to reach you sans email??',
                test: function(){
                    return $(this).val() == $("[name=emailConfirm]").val()
                }
            }
        }
    });

})