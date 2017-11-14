import landingPage from './landingPage/landingPage.Component';
import headerComponent from './headerComponent/headerComponent.Component';
import leftMenuComponent from './leftMenuComponent/leftMenuComponent.Component';
import subMenuListComponent from "./subMenuListComponent/subMenuListComponent.Component";

export default {
    initialize: function (Boiler, controllers, parentContext, dataContext, vueComponents) {
        //create a new context which is associated with the parent Context
        //var context = new Boiler.Context(parentContext);

        controllers.urlController.addRoutes({
            "/": {component: new landingPage(Boiler, parentContext, dataContext, vueComponents)},
            "subMenuList/{parentMenuInstanceId}": {
                component: new subMenuListComponent(Boiler, parentContext, dataContext, vueComponents)
            }
        });
        //controller.start();
        controllers.domController.addRoutes({
            '#mainNavBar': new headerComponent(Boiler, parentContext, dataContext),
            '#leftMenu': new leftMenuComponent(Boiler, parentContext, dataContext)
        });
    }
}
