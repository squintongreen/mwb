String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {       
        var reg = new RegExp("\\{" + i + "\\}", "gm");             
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}

var websiteName
errWebsiteName = function(){
    $(".tabs a[href$='#start-website']").click(); // switching to manage-fields tab
    $("#nameAlert p").text("You should assign some name to your webiste");
    $("#nameAlert").fadeIn();
    $("#websiteName").focus();
}
// click BINDINGS
var click_bindings = {
    "#manage-btn": function(){ 
        websiteName = $("#selectWebsite :selected").val().replace(/\s/g,'-')

        console.log(websiteName)
        $.getJSON('mobile/updateName', {websiteName: websiteName})

        $.getJSON("mobile/fields", {websiteName: websiteName}).success(function(json){
            $.each(json.fields, function(key, value){
                console.log(key + "=" + value);
                $("#fieldsForm").find(String.format("input[name='{0}']", key)).val(value);
            });
        })

        $.getJSON("mobile/theme", {websiteName: websiteName}).success(function(json){
            $("#choose-template li").removeClass("active")
            $("#choose-template").find(String.format("li[data-theme='{0}']",json.theme)).addClass("active")
        })

        $(".tabs .hide").removeClass("hide");
        $(".tabs a[href$='#manage-fields']").click();
        $.initFileUpload()
    },
    "#new-btn": function(){ 
        websiteName = $("#websiteName").val().replace(/\s/g,'-')

        if(!websiteName){
            errWebsiteName()
        } else {
            $.getJSON('mobile/updateName', {websiteName: websiteName}, function(){
                // succesfuly updated website name on server's session
                $.initFileUpload()
            })
            $("#nameAlert").fadeOut();

            // clearing all fields
            $("#manage-fields form input[type=text]").val("");
            $(".tabs .hide").removeClass("hide");
            $(".tabs a[href$='#manage-fields']").click(); // switching to manage-fields tab
        }
    },
    "a[href$=#preview-and-publish]": function(){
        $("#emulator_view").attr("src", "m/" + websiteName)
    },
    "#publish":function(){        
        websiteName = websiteName.toLowerCase().replace(/[\ ]/gi, "-")
        /*
        $("#qr_code").attr("src", String.format("http://www.esponce.com/api/v3/generate?content=http://scanshowsell.com/m/{0}&format=svg", name)); */
        /*
        $.ajax({
            url: "mobile/publish",
            data: {websiteName: websiteName},
            success: function(data){
                if(data == 'OK')
                    alert("Succesfully published")
            },
            error: function(data){
                if(data.status == 401) // unauthorized
                    window.location.replace(window.location.href.replace('index.html','login/'))
            }
        })
        */
        $("#preview-and-publish form input[name='websiteName']").val(websiteName)
        $("#preview-and-publish form").submit();
    }
}
// jQuery initialization
$(function () {
    'use strict';
    $.each(click_bindings,function(k,v){
        $(k).click(v);
    });

    $("#nameAlert").alert();

    $("#fieldsForm").ajaxForm(function(){ 
        $(".tabs a[href$='#manage-pictures']").click();
    });

    $.ajax({
        url: "mobile/websites",
        success: function(data){
            if(data.length) // if there are some websites to manage
                $("#manage-website-block").removeClass("hide");
            $(data).each(function(idx,v){
                $("#selectWebsite").append(String.format("<option value='{0}'>{0}</option>",v));
            });
        },
        error: function(data){
            console.log(data)
        }
    })

    $("#templates li").click(function(){
        $(".active", $(this).parent()).removeClass("active");
        $(this).addClass("active");
    })

    $(".tab-button").click(function(){
        $(".tabs a[href$='" + $(this).attr("href") + "']").click();
    });

    $("#choose-template .tab-button").click(function(){
        console.log($("#choose-template .active").data("theme"))
    $.ajax({
        url: "mobile/updateTheme",
        method: "POST",
        data: { theme: $("#choose-template .active").data("theme") },
        success: function(data) { console.log(data) },
        error: function(data) { },
    })
    });

    $('.tabs').tabs()


});
/*
 * jQuery File Upload Plugin JS Example 6.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */

$.initFileUpload = function(){
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload();

    // Load existing files:
    $.getJSON($('#fileupload').prop('action'), function (files) {
        console.log(files);
        var fu = $('#fileupload').data('fileupload'),
        template;
        fu._adjustMaxNumberOfFiles(-files.length);
        template = fu._renderDownload(files)
            .appendTo($('#fileupload .files'));
        // Force reflow:
        fu._reflow = fu._transition && template.length &&
            template[0].offsetWidth;
        template.addClass('in');
    });


    // Enable iframe cross-domain access via redirect page:
    var redirectPage = window.location.href.replace(
            /\/[^\/]*$/,
        '/result.html?%s'
    );
    $('#fileupload').bind('fileuploadsend', function (e, data) {
        if (data.dataType.substr(0, 6) === 'iframe') {
            var target = $('<a/>').prop('href', data.url)[0];
            if (window.location.host !== target.host) {
                data.formData.push({
                    name: 'redirect',
                    value: redirectPage
                });
            }
        }
    });

    // Open download dialogs via iframes,
    // to prevent aborting current uploads:
    $('#fileupload .files').delegate(
        'a:not([rel^=gallery])',
        'click',
        function (e) {
            e.preventDefault();
            $('<iframe style="display:none;"></iframe>')
                .prop('src', this.href)
                .appendTo(document.body);
        }
    );

    // Initialize the Bootstrap Image Gallery plugin:
    $('#fileupload .files').imagegallery();

};
