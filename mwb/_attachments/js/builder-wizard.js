builderWizard = function(options){
    var placeholder =  options.placeholder;
    var wizard = null;
    var websites = options.websites;
    var templates = options.templates;
    var emulator = options.emulator;
    var obj = {
        currentSite: {},
        currentStep:0,

        steps: [
            function(){
                wizard.html('');
                var siteMenu = $("<span id='siteMenu' style='display:inline-block; width:25%;'/>")
                $(websites).each(function(idx,it){
                    siteMenu.append(
                        $("<button style='width:100%'>" + it.name + "</button>").click(function(){
                            obj.loadSite(it);
                        })
                    );
                });
                siteMenu.append($("<hr/>"));
                siteMenu.append($("<button style='width:100%'>Create New Site...</button>").click(function(){
                    console.log('New website');
                }));
                $(siteMenu).buttonset();

                var sitePlace = $("<span id='sitePlace' style='width:p70%;height:100%;'/>")

                $(wizard).append(siteMenu);
                $(wizard).append(sitePlace);
            }, // step 0
            function(){
                wizard.html('');
                var sitePlace = $("<span id='sitePlace' style='width:p70%;height:100%;'/>")

                $(wizard).append(sitePlace);
                var templDiv = $("#sliderTempl").tmpl();
                
                $(templates).each(function(idx, it){
                    console.log(it.name);
                    it.idx = idx;
                    $("#slideTempl").tmpl(it).appendTo($('.overview', templDiv));
                });

                $("img", templDiv).click(function(){
                    /*
                    var emulatorHtml = $("#emulatorHtmlTempl").tmpl();
                    $("li", $(emulatorHtml)).button();
                    console.log(emulatorHtml);
                    $("#emulator_view").html($(emulatorHtml));
                    $("#emulator_view").css("background-image", "url(images/ouaeurn.png)");
                    */
                    var website = obj.currentSite;
                    var emulatorHtml = $("#emulatorHtmlTempl").tmpl(website);
                    //$("li", $(emulatorHtml)).button();
                    console.log($(emulatorHtml));
                    $("#emulator_view").contents().find('body').html($(emulatorHtml));
                    //console.log($("#emulator_view").contents());

                });
                
                return templDiv;
            }, // step 1
            function(){
            }, // step 2
            function(){
            }, // step 3
            function(){
            } // step 4
        ],
        loadSite: function(data){
            console.log(data);
            obj.currentSite = data;
            obj.gotoStep(0);
        },

        gotoStep: function(idx){
            console.log("Goto step" + idx);
            $("#sitePlace").html('');
            var step = obj.steps[obj.currentStep = idx]();
            console.log(step);
            $("#sitePlace").append(step);
            $("#slider-code").tinycarousel();
        },

        render: function(){
            wizard = $("<div id='wizard' style='width:800px;height:500px;'></div>")
            var wizardButtons = $("<div id='wizardButtons'></div>")
                .append($("<b>Previous</b>").button().click(function(){ obj.gotoStep(obj.currentStep - 1)}))
                .append($("<b>Next</b>").button().click(function(){ obj.gotoStep(obj.currentStep + 1)}))
            $(placeholder).append(wizard);
            $(placeholder).append(wizardButtons);

            obj.gotoStep(0);
        }
    }
    return obj;
}