import Vue from 'vue';
import userGroupListView from "./userGroupListRouterComponent.Component.vue";

let userGroupListComponent = function (Boiler, moduleContext, dataContext, vueComponents) {
    let panel = null, vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new Vue({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: h => h(userGroupListView)
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

export default userGroupListComponent;