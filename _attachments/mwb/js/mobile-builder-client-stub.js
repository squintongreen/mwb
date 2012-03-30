mobileBuilderClient = {
    checkUriAvailability: function(uri){
        return uri.indexOf("new") == -1
    },

    listMyWebsites: function(){
        return [
            {name: "My website #1", 
             code: {
                 style: [
                     "h1 {font-face: Verdana}",
                 ],
                 data: {
                     "About": {
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna.",
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna."
                     },
                     "My Work": {
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna.",
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna."
                     },
                     "Services": {
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna.",
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna."
                     },
                     "Events": {
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna.",
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna."
                     },
                     "Contact": {
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna.",
                         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id enim rhoncus libero interdum luctus. Nam id nunc. Nullam pharetra elit quis ipsum. Phasellus sed enim. Nulla facilisi. Ut pellentesque risus eget felis. Aliquam egestas nibh id metus. Phasellus eleifend nisi at ante. In hac habitasse platea dictumst. Nunc auctor ligula eget felis. Phasellus posuere, tellus nec nonummy venenatis, felis elit porttitor mauris, vitae tincidunt enim magna a eros. Mauris elit est, aliquam et, porttitor eu, dapibus interdum, augue. Morbi aliquet rutrum sem. Nam sollicitudin odio hendrerit mauris ornare ultricies. Sed turpis velit, mollis pulvinar, laoreet non, tincidunt vel, urna."
                     }
                 }
             }},
            {name: "My website #2", 
             code: {
                 layout: {
                     
                 },
                 data: {

                 }
             }},
            {name: "My website #3", 
             code: {
                 layout: {
                     
                 },
                 data: {

                 }
             }},
            {name: "My website #4", 
             code: {
                 layout: {
                     
                 },
                 data: {

                 }
             }}
        ]
    },

    listTemplates: function(){
        return [
            {name: "Template #1",
             url: 'images/adrian_shell_consulting.jpg',
             code: {}},

            {name: "Template #2",
             url: 'images/estelle_shop.jpg',
             code: {}},

            {name: "Template #3",
             url: 'images/gail_davis_photographer.jpg',
             code: {}},

            {name: "Template #4",
             url: 'images/make_up_artist.jpg',
             code: {}},

            {name: "Template #5",
             url: 'images/matt_whitby.jpg',
             code: {}},

            {name: "Template #6",
             url: 'images/niki_brown_photography.jpg',
             code: {}},
            
        ]
    },


}