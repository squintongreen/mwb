$(function(){
    WebsiteModel = Backbone.Model.extend({});

    WebsiteCollection = Backbone.Collection.extend({
        db : {
            changes : true
        },
        url : function(){
            return String.format("/com.scanshowsell.website:{0}", username)
        },
        model : WebsiteModel
    });
})