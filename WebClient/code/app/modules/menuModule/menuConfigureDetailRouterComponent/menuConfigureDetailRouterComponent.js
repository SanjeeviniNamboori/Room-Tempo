import Vue from "vue";
import menuInstanceDetailView from "./menuConfigureDetailRouterComponent.vue";

let menuInstanceDetailComponent = function (Boiler, moduleContext, dataContext, vueComponents) {
    let panel = null, vm = null;

    this.activate = function (parent, params) {

        dataContext.store.commit("setMenuInstanceId", params.menuInstanceId);

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new Vue({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: h => h(menuInstanceDetailView)
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

export default menuInstanceDetailComponent;