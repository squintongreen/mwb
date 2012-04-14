$.fn.extend({
    /*
     * Performs serialization of passed forms
     * 
     */
    serializeForms: function(forms) {
        var result = {}
        if($(this).valid()){
            $(this).each(function(){
                // transforming {name: NAME, value: VALUE} array of maps into {NAME:VALUE} arrays of maps
                var arr = _.collect($(this).serializeArray(), function(v, k) { 
                    var m = {};
                    m[v.name] = v.value;
                    return m;
                });

                var resultMap = {}
                var resultArray = []
                // transforming array of maps into single map if possible
                _.each(arr, function(val, idx){

                    var key = Object.keys(val)[0]
                    var value = val[key]
                    if(resultMap[key] == undefined){
                        resultMap[key] = value
                    } else {
                        resultArray.push(resultMap)
                        resultMap = {}
                        resultMap[key] = value
                    }

                });

                // storing result
                if(resultArray.length){
                    resultArray.push(resultMap)
                    result[$(this).attr("name")] = resultArray;
                } else {
                    result[$(this).attr("name")] = resultMap;
                }
            });

            return result;
        }
    },
    deserializeForms: function(model){
        $(this).each(function(){
            var form = this;
            var id = /* $(this).attr("id") || */ $(form).attr("name");
            var section = model.get(id);
            _.each(section, function(value, key){
                if(typeof(key) == 'number' || key.match(/\d*/)[0] != ""){
                    _.each(value, function(vv, vk){
                        $(form).find(String.format("[name=\"{0}\"]:eq({1})", vk, key)).val(vv);
                    });
                } else {
                    $(form).find(String.format("[name=\"{0}\"]", key)).val(value);
                }
            });
        }); 

    }
});