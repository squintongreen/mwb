var hash = window.location.hash;
var website_name = hash.replace(/#/g,'');
var username;

$.couch.session({
    success: function(session){
        username = session.userCtx.name;
    }
})

getHash = function(val){
    return String.format("#!{0}", val || window.location.hash.replace(/#!/g,''));
}

websiteId = function(val){
    return String.format("com.scanshowsell.website:{0}", val || window.location.hash.replace(/#!/g,''));
}

new_hash = function(){
    hash = window.location.hash;
    website_name = hash.replace(/#!/g,'');

    $("a.hash").each(function(idx, a){
        var href = $(a).attr("href")
        if(href) 
            href = href.replace(/#!.*/g, '');
        else 
            href = ""

        $(a).attr("href", href + hash);

    });

    // filling up forms
    var model = Websites.where({_id: websiteId(website_name)})[0]
    if(model){
        $("form").deserializeForms(model);
    }

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
    
    // _.templateSettings = {
    //     interpolate : /\{\{(.+?)\}\}/g
    // };

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

    $("#websiteName").val(window.location.hash.replace(/#!/g,''))


    WebsiteView = Backbone.View.extend({
        el: $("body"), 

        events: {
            "blur #websiteName": function(e){
                var a = $(e.target).valid();
                $("#new-btn").attr("href", $("#new-btn").attr("href").replace(/#.*/g, '') + "#!" + $(e.target).val());
            },
            "click #new-btn": function(e){
                var id = websiteId($("#websiteName").val());
                var model = {
                    _id: id,
                    owner: username
                }
                Websites.create(model,{
                    success:function(model){
                        console.log('Created', model)
                    },
                    error:function(error){
                        console.log('Error', error)
                    }
                })
            },

            // TESTME: this block of the code require more testing
            "click a.btn.success:contains('Save')": function(){
                var model = Websites.where({_id: websiteId(website_name)})[0];
                if(model){
                    var form = $("form").serializeForms();
                    _.each(form, function(val, key){
                        model.set(key, _.extend(model.get(key) || {}, val));
                    })
                    model.save();
                }
            },
            "click button.btn.success:contains('Build')": function(e){
                var userProfile = $(e.target).closest("form").serializeForms();
                userProfile = userProfile['registerForm']
                var userDoc = {
                    name: userProfile.emailAddress.replace(/@.*/gi, ''),
                    email: userProfile.emailAddress
                }
                $.couch.signup(userDoc, userProfile.password);
                window.location.replace("wizard.html" + getHash());
                e.stopPropagation();
                e.preventDefault();
                return true;
            },
            "click a.btn.delete:contains('Remove photo')": function(e){
                var model = Websites.where({_id: websiteId(website_name)})[0];
                if(model){
                    var form = $(e.target).closest("form")
                    var fileName = form.find("input[type=hidden][name=file-name]").val();
                    form.closest("div.#photo-panel").remove();
                    delete model.get("_attachments")[fileName];
                    model.save();
                }                
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
            var hash = getHash()
            var model_id = model.id.split(":");
            var name = model_id[1];
            var li = $("<li/>").append($("<a/>").attr("href", getHash(name)).text(name));
            // making li active
            if(name === getHash()){
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
            Websites.fetch({
                success:function(){
                    if(window.location.hash) new_hash()
                }
            });
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
})