import Vue from 'vue'
import view from './userChangePasswordVue.vue'


let parseParams = function (params) {
    let objToReturn = {};
    objToReturn.userId = params.userId;

    return objToReturn;
};

var Component = function (Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null, vm = null;

    this.activate = function (parent, params) {

//        dataContext.store.commit("setSelectedUserDetail", parseParams(params));

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new Vue({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: h => h(view)
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

export default Component;