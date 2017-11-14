import notificationListComponent from './notificationListComponent/notificationListVue.Component'
import notificationDetailComponentVue from './notificationDetailComponent/notificationDetailVue.Component'

export default {
    initialize: function (Boiler, controllers, parentContext, dataContext) {

        controllers.urlController.addRoutes({
            'notifications/{notificationId}': {
                component: new notificationDetailComponentVue(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics
                    notificationId: /(?:\r|\n|.)+/
                }
            }
        });

        controllers.urlController.addRoutes({
            'notifications': {
                component: new notificationListComponent(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics
                    //clientId: /^\d+$/
                }
            }
        });
        //controllers.start();
    }
}
