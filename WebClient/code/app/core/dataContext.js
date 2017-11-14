import io from "socket.io-client";
import Vue from "vue";
import Vuex from "vuex";
import moment from "moment-timezone";
import * as axios from 'axios';
import * as Toastr from 'toastr';

Vue.use(Vuex);

//set users timezone like this
//      moment.tz.setDefault("America/New_York");
moment.tz.setDefault(moment.tz.guess());

Toastr.options.positionClass = "toast-bottom-right";

let apiIp = window.location.protocol + "//" + window.location.hostname + ":1339";// "/dev/socket.io/";

let socket = io(apiIp);
//let socket = io('http://192.168.1.9:1337');


socket.on('connect', function () {
    console.log("connected...!");
});


socket.on('NotificationReceived', function (response) {
    console.log(response);
    /*
    store.commit("setDataByType", Object.assign({}, { NotificationIdText: response["NotificationId"] }, {
        data: {
            status: "success",
            err: "",
            response: response
        }
    })); */

    store.dispatch("getNotificationKeys", { "params": {} })
});

let dataRequestHandler = (key, params, callback) => {

    let continueTheCall = (key, params, callback) => {
        socket.emit(key, params, (err, response) => {
            if (err && err.message === "Session Expired")
                window.location.href = "login.html";
            else {
                if (params.updateToken) {
                    window.localStorage.setItem('rttoken', response["token"]);
                }
                callback(err, response);
                $(".mainBody").css("display", "");
            }
        });
    };

    params.systemParams = {
        token: window.localStorage.getItem('rttoken'),
        Source: "Web",
        SourceId: window.location.hostname,
    };

    continueTheCall(key, params, callback);
};


let apiHttpRequest = function (apiUrl, type, params, successCallback, failureCallback) {
    let url = apiIp + "/" + apiUrl;
    axios.post(url, params)
        .then(function (response) {
            if (successCallback)
                successCallback(response);
        })
        .catch(function (error) {
            if (failureCallback)
                failureCallback(error);
        });
};

let downloadExcelFile = function (fileName, module) {
    const BASE_URL = window.location.protocol + "//" + window.location.hostname + ":1338";
    const url = `${BASE_URL}/Excel`;

    var form = $('<form/>', { action: url, method: 'POST' }).appendTo('body');
    form.append("<input type='hidden' name='fileName' value='" + fileName + "' />");
    form.append("<input type='hidden' name='module' value='" + module + "' />");
    form.append("<input type='hidden' name='token' value='" + window.localStorage.getItem('vwtoken') + "' />");
    form.submit();
}

const store = new Vuex.Store({
    state: {
        isCurrentUserAdmin: false,
        uiPageName: "indexdev.html",
        selectedUserDetail: null,
        notification: {},
        notificationList: {},
        userGroupInstanceId: null,
        selectedMenuId: null,
        menuInstanceId: null,
        parentMenuInstanceId: null,
        defaultSessionCount: -2, //adding two default sessions
        selectedNotificationDetail: null,
        dashboardRouterContext: null,
        rowsPerPage: 10,
        sendApiRequest: apiHttpRequest,
        downloadExcelFile: downloadExcelFile,
        /* added for reports (excel,csv and pdf files download functionality) */
        reportHttpUrl : window.location.protocol + "//" + window.location.hostname + ":3002"
       
    },
    mutations: {
        setIsCurrentUserAdmin(state, isCurrentUserAdmin) {
            state.isCurrentUserAdmin = isCurrentUserAdmin;
        },
        setUIPageName(state, text) {
            state.uiPageName = text;
        },
        setSelectedUserDetail(state, payload) {
            state.selectedUserDetail = payload;
        },
        setLeaveRouterContext(state, payload) {
            state.leaveRouterContext = payload;
        },
        setUserGroupInstanceId(state, payload) {
            state.userGroupInstanceId = payload;
        },
        setMenuInstanceId(state, payload) {
            state.menuInstanceId = payload;
        },
        setParentMenuInstanceId(state, payload) {
            state.parentMenuInstanceId = payload;
        },
        setSelectedMenuId(state, payload) {
            state.selectedMenuId = payload;
        },
        setSelectedNotifcationDetail(state, payload) {
            state.selectedNotificationDetail = payload;
        },
        setDashboardRouterContext(state, payload) {
            state.dashboardRouterContext = payload;
        },
        setDataByType(state, payload) {
            // if (state.hasOwnProperty("notification")) {
            Vue.set(state["notification"], payload.NotificationIdText, payload.data);
            // }
        },
        setNotifications(state, payload) {
            // if (state.hasOwnProperty("notification")) {
            Vue.set(state["notificationList"], "0", payload.data);
            // }
        },
    },
    actions: {
        dataRequestHandler({ }, payload) {
            // A wrapper for calling server directly from Vue Components
            dataRequestHandler(payload.key, payload.params, payload.callback);
        },
        toastr({ }, payload) {
            if (payload.type && payload.header && payload.message) {
                Toastr[payload.type](payload.message, payload.header);
            } else if (payload.type && payload.message) {
                Toastr[payload.type](payload.message);
            }
        },
        getNotificationDetail({ commit, state }, payload) {

            if (state["notification"] && !state["notification"].hasOwnProperty(payload.params.notificationId)) {
                commit("setDataByType", Object.assign({}, { NotificationIdText: payload.params.notificationId }, {
                    data: {
                        status: "loading",
                        err: "",
                        response: null
                    }
                }));

                dataRequestHandler("GetNotificationDetail", payload.params, function (err, response) {
                    if (err) {
                        commit("setDataByType", Object.assign({}, { NotificationIdText: payload.params.notificationId }, {
                            data: {
                                status: "error",
                                err: err,
                                response: null
                            }
                        }));
                        return;
                    }

                    commit("setDataByType", Object.assign({}, { NotificationIdText: payload.params.notificationId }, {
                        data: {
                            status: "success",
                            err: "",
                            response: response[0]
                        }
                    }));
                });
            }
        },
        getNotificationKeys({ commit, state }, payload) {

            if (state["notificationList"] && !state["notificationList"].hasOwnProperty("0")) {
                commit("setDataByType", Object.assign({}, {}, {
                    data: {
                        status: "loading",
                        err: "",
                        response: null
                    }
                }));
            }

            dataRequestHandler("GetNotificationList", payload.params, function (err, response) {
                if (err) {
                    commit("setNotifications", Object.assign({}, {}, {
                        data: {
                            status: "error",
                            err: err,
                            response: null
                        }
                    }));
                    return;
                }

                commit("setNotifications", Object.assign({}, {}, {
                    data: {
                        status: "success",
                        err: "",
                        response: response[0]
                    }
                }));
            });

        },
    },
    getters: {
        getNotificationDetail: (state, getters) => (query) => {
            if (state["notification"] && state["notification"].hasOwnProperty(query.params.notificationId)) {
                return state["notification"][query.params.notificationId];
            }
            return null;
        },
        getNotificationKeys: (state, getters) => (query) => {
            if (state["notificationList"] && state["notificationList"].hasOwnProperty("0")) {
                return state["notificationList"]["0"];
            }
            return null;
        },
    }
});

export default {
    uiPageName: (function () {
        if (window.location.href.toLowerCase().indexOf("indexdev.html") > -1) {
            // store.commit("setUIPageName", "indexdev.html");
            return "indexdev.html";
        }
        else {
            // store.commit("setUIPageName", "index.html");
            return "index.html";
        }
    })(),

    store: store,

    dataRequestHandler: dataRequestHandler
};
