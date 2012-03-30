$(function () {
    $("a[rel=twipsy]").twipsy({
        live: true,
        offset: 10,
        delayIn: 800,
        placement: 'right',
        trigger: 'focus'
    });


    $( "#dialog" ).dialog({ 
        
        autoOpen: true,
        modal: true,
        draggable: false,
        resizable: false,
        width: 500,
        height: 300,
        title: 'Manage your mobile website'
    });

    var slider = $('#templateSlider').bxSlider({
        controls: false,
        auto: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        pager: true
    });

    $('#go-prev').click(function(){
        slider.goToPreviousSlide();
        return false;
    });

    $('#go-next').click(function(){
        slider.goToNextSlide();
        return false;
    });



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

    $("input[rel=popover]")
        .popover({
            offset: 10,
            placement: 'right',
            trigger: 'focus'
        })
        .click(function(e) {
            e.preventDefault()
        })

    $('.add_service').click(function() {
        $('.listServices').append('<li>' + '<div class="clearfix"><label>Type of Service</label><div class="input"><input class="span6" id="input" name="Service Type" type="text" placeholder="e.g. Home A/V Setup" required /></div></div>' + '<div class="clearfix"><label>Short Description</label><div class="input"><textarea name="Description" value="" rows="5" class="span6">Short description of service. Maximum of 255 characters.</textarea><p class="hint-inline">Accepted HTML tags: <code>&lt;a&gt;</code>,<code>&lt;strong&gt;</code>, and <code>&lt;em&gt;</code>.</p></div></div>' + '<a href="#" class="remove_service"><button type="button" class="btn small danger delete">Remove service</button></a>' + '</li>');

        return false;
    });

    // using live() will bind the event to all future
    // elements as well as the existing ones
    $('.remove_service').live('click', function() {
	$(this).parent().remove();

        return false;
	var counter = 1;
	var limit = 5;
	function addInput(divName){
	    if (counter == limit)  {
	        alert("You have reached the limit of adding " + counter + " inputs");
	    }
	    else {
	        var newdiv = document.createElement('div');
	        newdiv.innerHTML = "Area " + (counter + 1) + " <br /><br /><input type='text' name='myInputs[]'><br /><br />";
	        document.getElementById(divName).appendChild(newdiv);
	        counter++;
	    }
	}
    })
});
