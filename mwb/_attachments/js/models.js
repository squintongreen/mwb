$(function(){
    WebsiteModel = Backbone.Model.extend({});

    WebsiteCollection = Backbone.Collection.extend({
        db : {
            changes : true
        },
        url : "/com.scanshowsell.website",
        model : WebsiteModel
    });
})