$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

String.format = function() {                                                                                                                                                                                                                                                     
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}


$.collect = function(c, f) {
    var a = [];
    $.each(c, function(k, v) {
        a.push(f(k, v));
    });
    return a;
};


li = function(nested){
    return String.format("<li>{0}</li>", nested)
}

a = function(nested){
    return String.format("<a href='#'>{0}</a>", nested)
}

$(document).ready(function(){
    // twipsying
    $("input[data-rel=twipsy]").twipsy({
        live: true,
        offset: 10,
        delayIn: 800,
        placement: 'right',
        trigger: 'focus'
    })

    //$('#modal-intro').modal('show')


    $(window).scroll(function(e) {
        // 40 is the offsetTop of the menu. This should be constant as such
        // it's defined that way. To get your offsetTop you can use
        // document.getElementById('id').offsetTop or $('selector').offset().top
        if ($(window).scrollTop() > 450) {
            $('#instructions').css({
                position: 'fixed',
                top: '0',
                left: '139px'
            });
        }
        else {
            $('#instructions').css({
                position: 'static'
            });
        }
    });

})