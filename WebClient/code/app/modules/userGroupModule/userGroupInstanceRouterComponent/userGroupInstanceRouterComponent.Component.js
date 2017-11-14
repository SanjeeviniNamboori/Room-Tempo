import Vue from "vue";
import userGroupInstanceView from "./userGroupInstanceRouterComponent.Component.vue";

let userGroupInstanceComponent = function (Boiler, moduleContext, dataContext, vueComponents) {
    let panel = null, vm = null;

    this.activate = function (parent, params) {

        dataContext.store.commit("setUserGroupInstanceId", params.userGroupInstanceId);

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new Vue({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: h => h(userGroupInstanceView)
            })
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

export default userGroupInstanceComponent;