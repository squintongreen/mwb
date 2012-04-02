$(function(){
    WebsiteModel = Backbone.Model.extend({});

    WebsiteCollection = Backbone.Collection.extend({
        db : {
            changes : true
        },
        url : "/com.scanshowsell.website",
        comparator: function(parent) { return parent.get("name") },
        model : WebsiteModel
    });
})