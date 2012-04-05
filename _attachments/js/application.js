var hash = window.location.hash;
var website_name = hash.replace(/#/g,'');
var username;

$.couch.session({
    success: function(session){
        username = session.userCtx.name;
    }
})

new_hash = function(){
    hash = window.location.hash;
    website_name = hash.replace(/#/g,'');

    $("a").each(function(idx, a){
        var href = $(a).attr("href")
        if(href == undefined)
            href ="";
        href = href.split("#")[0]
        $(a).attr("href", href + hash);
    });


    $("#site-manager-dropdown .divider:first").prevAll().removeClass("active");
    $("#site-manager-dropdown").find(String.format("li:contains('{0}')", website_name)).addClass("active");
    $("#site-toggle").text("Currently editing:" + website_name) // FIXME template should be used
}

$(window).bind("hashchange", new_hash)

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
        console.log("change", model)
    })


    Websites.on('add', function(model){ 
        console.log("Website added:", model.id);
    })

    Websites.on('remove', function(model){ 
        console.log("Website removed:", model.id);
    })


    WebsiteView = Backbone.View.extend({
        el: $("body"), 

        events: {
            "click #new-btn": function(e){
                var model = {
                    _id: String.format("org.scanshowsell.website:{0}:{1}", username, $("#websiteName").val())
                }
                Websites.create(model,{
                    success:function(model){
                        console.log('Created', model)
                    },
                    error:function(error){
                        console.log('Error', error)
                    }
                })
                e.stopPropagation();
                e.preventDefault();
                return true;
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
            var hash = window.location.hash.substring(1)
            var model_id = model.id.split(":");
            var name = model_id[2];
            var li = $("<li/>").append($("<a/>").attr("href", "#" + name).text(name));
            // making li active
            if(hash && name === hash){
                li.addClass("active")
            }
            $("#site-manager-dropdown").prepend(li);
        },

        deleteRow: function(model){
            console.log("deleteRow", this)
        },
        reseted: function(model){
            console.log("reseted", this)
            $("#dropdown li.divider:first").prevAll().remove();
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
        // Bootstrapping
        new WebsiteView({model: Websites });
        new App();

    }, 100);

    $("button:contains('Save')").click(function(){
        var model = Websites.where({_id: String.format("com.scanshowsell.website:{0}:{1}", username, website_name)})[0]
        var form = {};
        $("form").each(function(){
            form[$(this).attr("name")] = $(this).serializeArray();
        });

        model.set(form);

        model.save();
    });

    if(window.location.hash)
        new_hash()
})