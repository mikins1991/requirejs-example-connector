define(function (require) {
    var $ = require('jquery'),
        lib = require('./lib'),
        controller = require('./controller/c1'),
        model = require('./model/m1'),
        backbone = require('backbone'),
        underscore = require('underscore');

    controller.setModel(model);
    $(function () {
        controller.render(lib.getBody());

        //Display backbone and underscore versions
        $('body')
            .append('<div>backbone version: ' + backbone.VERSION + '</div>')
            .append('eventsLib: ' + JSON.stringify(window.eventsLib) + '</div>')
            .append('<div>underscore version: ' + underscore.VERSION + '</div>');
    });
});
