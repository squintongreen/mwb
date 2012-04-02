$(function(){
    // Fill this with your database information.                                                                                           // `ddoc_name` is the name of your couchapp project.

    Backbone.couch_connector.config.db_name = "mwb"
    Backbone.couch_connector.config.ddoc_name = "mwb"

    // If set to true, the connector will listen to the changes feed
    // and will provide your models with real time remote updates.
    // But in this case we enable the changes feed for each Collection on our own.
    Backbone.couch_connector.config.global_changes = false;

    // Enables Mustache.js-like templating.
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };

    var isDirty = false;

    Websites = new WebsiteCollection();

    Websites.on('change', function(model){ 
        notification('Документ змінено:' + model.id)
        console.log("change", model)
        console.log("title", $("#title").val())

        if(model.id == $("#title").val()){
            console.log("change", model)
            // same document is changing
            $("form input[name=_rev]").val(
                model.get("_rev") // updating _rev
            ).trigger("set");

            $("form input[name=_attachments]").val(
                JSON.stringify(model.get("_attachments")) // updating _attachments
            ).trigger("set");
        }
    })

    /*
    Articles.on('add', function(model){ 
        notification('Документ додано:' + model.id)        
    })

    Articles.on('remove', function(model){ 
        notification('Документ видалено:' + model.id)        
    })
    */

    WebsiteView = Backbone.View.extend({
        el: $("#parent"), 

        events: {
            "change": function(e){
                if(isDirty == false){
                    FilteredArticles.resetCollection(); // FIXME this is not good to act so, better to find the reason for problem
                    FilteredArticles.setFilter();
                    console.log("#parent change")
                }

                $("#title option:first").attr("selected", "selected");
                $("#title").trigger('liszt:updated').trigger("change");
            }
        },

        initialize : function(){
            // When the session gets destroyed, the row will be destroyed too
            _.bindAll(this, 'reseted', 'addRow', 'deleteRow', 'render');

            this.model.bind("add", this.addRow);
            this.model.bind("remove", this.deleteRow);
            this.model.bind("reset", this.reseted);
            this.model.bind("change", this.render);
        },

        render: function(){
            console.log("render", this)
        },

        addRow : function(model){
            console.log("addRow", this)
            $("#dropdown .divider")
                .prepend($("li").val(model.id).text(model.id.split(":")[1]));
        },

        deleteRow: function(model){
            console.log("deleteRow", this)
        },
        reseted: function(model){
            console.log("reseted", this)
            $("#dropdown li > .divider").remove();
            model.each(this.addRow);
        }
    });



    // The App router initializes the app by calling `UserList.fetch()`
    var App = Backbone.Router.extend({
        initialize : function(){
            Websites.fetch();
        }
    });

    // Booststrap app after delay to avoid continuous activity spinner
    _.delay(function(){

        // Destroy the current session on unload
        $(window).unload(function(){
            $.ajaxSetup({
                async : false
            });
        });

        // Includes the couchlogin
        // check it out here: <a href="https://github.com/couchapp/couchdb-login-jquery">https://github.com/couchapp/couchdb-login-jquery</a>
        $('#login_form').couchLogin({
            loggedIn : function(user){

            },
            loggedOut : function(){

            }
        });

        // Bootstrapping
        new WebsiteView({model: Websites });
        new App();

    }, 100);

})