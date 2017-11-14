import reservationListModule from './reservationListModule/reservationList.Component'

export default {
    initialize: function (Boiler, controllers, parentContext, dataContext) {

        // controllers.urlController.addRoutes({
        //     'reservation/{reservationId}': {
        //         component: new userDetailComponent(Boiler, parentContext, dataContext),
        //         routeRules: {
        //             // numerics
        //             userId: /(?:\r|\n|.)+/
        //         }
        //     }
        // });

        controllers.urlController.addRoutes({
            'reservations': {
                component: new reservationListModule(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics                  
                }
            }
        });
    }
};