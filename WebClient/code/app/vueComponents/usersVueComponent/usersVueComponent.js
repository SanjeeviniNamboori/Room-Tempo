import Vue from "vue";


import userListComponent from "./userListComponent/userListComponent.vue";
import userHeaderComponent from "./userHeaderComponent/userHeaderComponent.vue";
import userSearchComponent from "./userSearchComponent/userSearchComponent.vue";

import userGroupListComponent from "./userGroupComponent/userGroupListComponent/userGroupListComponent.vue";
import userGroupInstanceComponent from "./userGroupComponent/userGroupInstanceComponent/userGroupInstanceComponent.vue";
import userGroupEditMetaDataComponent from "./userGroupComponent/userGroupEditMetaDataComponent/userGroupEditMetaDataComponent.vue";



Vue.component(userListComponent.name, userListComponent);
Vue.component(userHeaderComponent.name, userHeaderComponent);
Vue.component(userSearchComponent.name, userSearchComponent);

Vue.component(userGroupListComponent.name, userGroupListComponent);
Vue.component(userGroupInstanceComponent.name, userGroupInstanceComponent);
Vue.component(userGroupEditMetaDataComponent.name, userGroupEditMetaDataComponent);

export default {
    //Just using this for registering components
}
