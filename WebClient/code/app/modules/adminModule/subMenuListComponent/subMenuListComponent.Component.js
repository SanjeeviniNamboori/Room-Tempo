import Vue from "vue";
import subMenuListView from "./subMenuListComponent.vue";

let subMenuListComponent = function (Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null, vm = null;

    this.activate = function (parent, params) {

        dataContext.store.commit("setParentMenuInstanceId", params.parentMenuInstanceId);

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new Vue({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: h => h(subMenuListView)
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

export default subMenuListComponent;