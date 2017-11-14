import Vue from "vue";

import vueDraggable from "vuedraggable";

import usersVueComponent from './usersVueComponent/usersVueComponent';
import reservationsVueComponent from './reservationsVueComponent/reservationsVueComponent';

import datePickerComponent from "./datePicker/datePicker.vue";
import appointmentCalendarComponent from "./appointmentCalendar/appointmentCalendar.vue";

import menuConfigureMetaDataComponent from "./menuComponent/menuConfigureMetaDataComponent/menuConfigureMetaDataComponent.vue";
import menuInstanceListComponent from "./menuComponent/menuInstanceListComponent/menuInstanceListComponent.vue";
import menuInstanceDetailComponent from "./menuComponent/menuConfigureDetailComponent/menuConfigureDetailComponent.vue";

import notificationItemComponent from "./notificationItemComponent/notificationItemComponent.vue";

Vue.component("vue-draggable", vueDraggable);
Vue.component(datePickerComponent.name, datePickerComponent);
Vue.component(appointmentCalendarComponent.name, appointmentCalendarComponent);

Vue.component(menuConfigureMetaDataComponent.name, menuConfigureMetaDataComponent);
Vue.component(menuInstanceListComponent.name, menuInstanceListComponent);
Vue.component(menuInstanceDetailComponent.name, menuInstanceDetailComponent);

Vue.component(notificationItemComponent.name, notificationItemComponent);
export default {
    vueDraggable
};
