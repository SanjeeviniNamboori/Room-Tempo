//var Boiler = require("./core/_boiler_"); // BoilerplateJS namespace used to access core classes, see above for the definition
import Boiler from './core/_boiler_'
import vueComponents from './vueComponents/vueComponents'
import modules from "./modules/modules"	//modules = require("./modules/modules"); //file where all of your product modules will be listed


//return an object with the public interface for an 'application' object. Read about module pattern for details.
export default {
    initialize: function () {

        /* In JavaScript, functions can be used similarly to classes in OO programming. Below,
         * we create an instance of 'Boiler.Context' by calling the 'new' operator. Then add
         * global settings. These will be propagated to child contexts
         */
        var globalContext = new Boiler.Context();

        var controllers = {
            urlController : new Boiler.UrlController($(".appcontent")),
            domController : new Boiler.DomController($('#page-content'))
        }
        /* In BoilerplateJS, your product module hierachy is associated to a 'Context' heirachy. Below
         * we create the global 'Context' and load child contexts (representing your product sub modules)
         * to create a 'Context' tree (product modules as a tree).
         */
        for (var i = 0; i < modules.length; i++) {
            modules[i].initialize(Boiler, controllers, globalContext, Boiler.dataContext, vueComponents);
        }
        controllers.domController.start();
        controllers.urlController.start();
    }
};

