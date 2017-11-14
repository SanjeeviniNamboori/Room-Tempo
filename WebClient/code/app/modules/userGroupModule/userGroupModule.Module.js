import userGroupListComponent from "./userGroupListRouterComponent/userGroupListRouterComponent.Component";
import userGroupInstanceComponent from "./userGroupInstanceRouterComponent/userGroupInstanceRouterComponent.Component";

export default {
    initialize: function (Boiler, controllers, parentContext, dataContext, vueComponents) {
        let UserGroupListComponent = new userGroupListComponent(Boiler, parentContext, dataContext, vueComponents);
        let UserGroupInstanceComponent = new userGroupInstanceComponent(Boiler, parentContext, dataContext, vueComponents);

        controllers.urlController.addRoutes({
            "userGroupList": {
                component: UserGroupListComponent
            }
        });

        controllers.urlController.addRoutes({
            "userGroupInstance/{userGroupInstanceId}": {
                component: UserGroupInstanceComponent
            }
        });
    }
};