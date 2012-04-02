function(doc, req) {
    // !json template
    // !code vendor/couchapp/lib/underscore.js

    _ = this._
    // Enables Mustache.js-like templating.    
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };

    var tmpl = template[req.path[5]]
    var index = _.template(tmpl['_'])

    send(index({ req: req, template: tmpl, file: req.path[6].replace(/\.html/,'') }))

}