import menuListRouterComponent from "./menuInstanceListRouterComponent/menuInstanceListRouterComponent";
import menuConfigureRouterComponent from "./menuConfigureDetailRouterComponent/menuConfigureDetailRouterComponent";

export default {
    initialize: function (Boiler, controllers, parentContext, dataContext, vueComponents) {
        let menuListComponent = new menuListRouterComponent(Boiler, parentContext, dataContext, vueComponents);
        let menuConfigureComponent = new menuConfigureRouterComponent(Boiler, parentContext, dataContext, vueComponents);

        controllers.urlController.addRoutes({
            "menuList": {
                component: menuListComponent
            }
        });

        // controllers.urlController.addRoutes({
        //     "menuInstance/{menuInstanceId}": {
        //         component: menuDetailComponent
        //     }
        // });

        controllers.urlController.addRoutes({
            "menuConfigure/{menuInstanceId}": {
                component: menuConfigureComponent
            }
        });
    }
};