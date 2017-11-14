import userComponent from './userListModule/userListVue.Component'
import userDetailComponent from './userDetailModule/userDetailVue.Component'
import userProfileComponent from './userProfileComponentVue/userProfileComponentVue.Component'
import userChangePassword from './userChangePassword/userChangePasswordVue.Component'

export default {
    initialize: function (Boiler, controllers, parentContext, dataContext) {

        controllers.urlController.addRoutes({
            'user/{userId}': {
                component: new userDetailComponent(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics
                    userId: /(?:\r|\n|.)+/
                }
            }
        });

        controllers.urlController.addRoutes({
            'users': {
                component: new userComponent(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics                  
                }
            }
        });

         controllers.urlController.addRoutes({
            'userProfile': {
                component: new userProfileComponent(Boiler, parentContext, dataContext),
                routeRules: {                  
                    //clientId: /^\d+$/
                }
            }
        });

        controllers.urlController.addRoutes({
            'changePassword': {
                component: new userChangePassword(Boiler, parentContext, dataContext),
                routeRules: {                  
                    //clientId: /^\d+$/
                }
            }
        });
        
    }
};