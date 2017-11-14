import adminModle from './adminModule/adminModule.Module.js';
import notifications from './notifications/notificationModule.Module.js';
import userModule from "./userModule/userModule.module";
import userGroupModule from "./userGroupModule/userGroupModule.Module";
import menuModule from "./menuModule/menuModule.Module";
import reservationModule from "./reservations/reservations.Module";

/* 
 * Return an array containing all modules classes that needs to be initiated.
 * We use the 'require' function of requirejs to get the relevant module context classes.
 * This could be done of course, by passing those scripts as dependencies to 
 * the 'define' function above. But following model is a bit simpler to read.
 */
export default [
    adminModle,
    notifications,    
    userModule,    
    userGroupModule,    
    menuModule,
    reservationModule
];
