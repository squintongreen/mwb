var current_it = null;

$(function(){
    
    var current_data_item = window.localStorage.getItem("current-data-item")
    if(current_data_item){
        console.log("Found");
        $("ul[data-role='listview']").replaceWith($(current_data_item));
        //$("#main").append($(current_data_item));
        $("#main ul[data-role='listview']").listview();
    }

    decorate = function(it){
        current_it = $(it);
        window.localStorage.setItem("current-data-item", $(it).outerHtml())
        var nodeName = it.nodeName.toLowerCase();
        var nodeRole = $(it).data("role");
        if(nodeRole == null)
            nodeRole = nodeName;
        //var d = $.mobile.changePage(nodeRole + "-template.html");
        window.location.href=nodeRole + "-template.html";
    }


    $(document).bind('pageinit', function(event){
        console.log("pageinit");
        
        // hooking the initializer
        /*
          var txtElement = $(":contains('" + $(current_it).text() + "') :last", current_it)
          
          console.log(current_it);
          $("#data-role").val($(current_it).data("role"));
          $("#data-icon").val($(current_it).data("icon"));
          $("#txt").val($(current_it).text());
          $("a[data-icon=check]").click(function(){
          var lv = $('<ul data-role="listview" data-inset="true" data-filter="true">'+
          '<li data-icon="delete" class="managable"><a href="#acura">Acura1</a></li>'+
          '<li data-icon="info" class="managable"><a href="#audi">Audi</a></li>'+
          '<li data-icon="alert" class="managable"><a href="#bmw">BMW</a></li>'+
          '</ul>')
          console.log(lv);
          $(current_it).parent().replaceWith(lv);
          $(lv).listview();
          });
        */
    });


    $(".managable").each(function(){
        $(this).taphold(function(e){ 
            e.preventDefault();
            decorate(this);
            //e.stopPropagation();
            return false;

        })
    })
});
