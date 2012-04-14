function(doc, req) {
    // !json template
    // !code vendor/couchapp/lib/underscore.js

    if(!req.userCtx.name)
        throw (['error', 'not_found', 'Some message like Page not found'])
    _ = this._
    // Enables Mustache.js-like templating.    
     _.templateSettings = {
         interpolate : /\{\{(.+?)\}\}/g
     };

    var tmpl = template[req.path[5]]

    processTemplate = function(fileName){
        var callback = _.template(tmpl[fileName])
        return callback({req: req, template: tmpl, processTemplate: processTemplate })
    }

  
    var index = _.template(tmpl['_'])

    send(index({ template: tmpl, file: req.path[6].replace(/\.html/,''), processTemplate: processTemplate  }))

}