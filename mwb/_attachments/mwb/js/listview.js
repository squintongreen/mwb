hookIt = function(it){
    var jqm = html2jqm(it);
    console.log("Hooked " + jqm);
    // feeling the menu
    var select = $("#select-li");
    $(jqm).each(function(idx, item){
        select.append($("<option>" + item["text"] + "</option>").val(idx))
    });
    select.append("<option>New...</option>");
    
    select.change(function(){
        console.log($(select).val());
        if($(select).val() == "New..."){
            console.log("New element selected");
            $("#text,#small-text").val("");
            $("#thumb").attr("src", "http://www.metalmusicarchives.com/images/covers/avariel-no-end-in-sight(demo)-20110719103608.jpg");
        } else {
            var idx = $(":selected", select).index();
            if(idx !== undefined){
                $("#text").val(jqm[idx]["text"]);
                $("#thumb").attr("src", jqm[idx]["thumb"] || "http://www.metalmusicarchives.com/images/covers/avariel-no-end-in-sight(demo)-20110719103608.jpg");
                $("#small-text").val(jqm[idx]["small-text"]);
                var iconIdx = 0;
                if(jqm[idx]["icon"])
                    iconIdx = jqm[idx]["icon"];
                $("#select-icon [value='" + iconIdx+ "']").attr("selected", "selected");
                $("#select-icon").selectmenu("refresh");
            }
        }
    })

    $(":first", select).attr("select", "select");
    select.selectmenu("refresh");
    //select.change();

    $("#thumb").change(function(it){
        console.log("Thumb changed + " + $(this));
        var idx = $(":selected", select).index();
        jqm[idx]["thumb"] = $(this).attr("src");
    });

    $("#text").focusout(function(){
        var val = $(this).val();
        var idx = $(":selected", select).index();
        if(val == "") {
            jqm.remove(idx);
        $("#select-li :selected").remove();
        } else {
            $("#select-li :selected").text(val);
            jqm[idx]["text"] = val;
        }
        select.selectmenu("refresh");
    });

   $("#small-text").focusout(function(){
        var val = $(this).val();
        var idx = $(":selected", select).index();
       jqm[idx]["small-text"] = val;
    });

    $("#select-icon").change(function(){
        var idx = $("#select-li :selected").index();
        jqm[idx]["icon"] = $("#select-icon").val() != "0"?$("#select-icon").val():undefined;
    });

    $("#extended").change(function(){
        if($(this).is(":checked")){
            $("#extended-panel").slideDown();
        } else {
            $("#extended-panel").slideUp();
        }
    });

    $("button:contains('Submit')").mouseup(function(){
        var listview = $(jqm2html(jqm));
        window.localStorage.setItem("current-data-item", $(listview).outerHtml())
        window.location.href="emulator.html";
        /*
        listview.listview();
        /* console.log(listview); */
    });
}

html2jqm = function(html){
    var data = [];
    $("li", html).each(function(idx, li){
        data[idx] = {}

        data[idx]["text"] = $("h1", li).text() || $(li).text()
        data[idx]["small-text"] = $("p", li).text()
        data[idx]["thumb"] = $("img", li).attr("src")
        data[idx]["icon"] = $(li).data("icon")

    });
    console.log(data);
    return data;
}

jqm2html = function(jqm){
    var listview = $("<ul data-role='listview' data-inset='true' class='managable'></ul>");
    $(jqm).each(function(idx, item){
        var li = $("<li></li>");
        li.attr("data-icon", item["icon"]);
        var a = $("<a href='#bmw'></a>");
        a.append($("<img>").attr("src", item["thumb"]));
        a.append($("<h1>").text(item["text"]));
        a.append($("<p>").text(item["small-text"]));
        li.append(a);
        listview.append(li);
    });
    return listview;
}