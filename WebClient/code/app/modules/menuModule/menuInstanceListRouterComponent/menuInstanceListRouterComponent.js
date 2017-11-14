import Vue from "vue";
import menuInstanceListView from "./menuInstanceListRouterComponent.vue";

let menuInstanceListComponent = function (Boiler, moduleContext, dataContext, vueComponents) {
    let panel = null, vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new Vue({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: h => h(menuInstanceListView)
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

export default menuInstanceListComponent;