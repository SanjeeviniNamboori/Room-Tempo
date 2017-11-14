<template src="./subMenuListComponent.template.html"></template>
<script>
    export default {
        name: "vw-sub-menu-list-component",
        data() {
            return {
                menuDetail: null,
                subMenuList: [],
                fncVariables: {
                    getMyApprovalPendingCount: null,
                    getPendingConcessionListCount: null,
                    getDeanApprovedConcessionCount: null,
                    getDeanRejectedConcessionCount: null,
                    getDirectorApprovedConcessionCount: null,
                    getDirectorRejectedConcessionCount: null,
                    getAllConcessionListCount: null
                }
            }
        },
        methods: {
            getData() {
                this._getSubMenuListByParentMenuId();
            },
            _getSubMenuListByParentMenuId() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetSubMenusByParentMenuInstanceId",
                    params: {
                        parentMenuInstanceId: vm.computedParentMenuInstanceId
                    },
                    callback: (error, response) => {
                        console.log("Error => ", error);
                        console.log("Response => ", response);
                        vm.menuDetail = response.menuDetail;
                        response.subMenuList.forEach(function (subMenuItem) {
                            if (subMenuItem.MethodToDisplayMenuCount && vm.hasOwnProperty(subMenuItem.MethodToDisplayMenuCount)) {
                                vm[subMenuItem.MethodToDisplayMenuCount](vm);
                            }
                        });
                        vm.subMenuList = response.subMenuList;
                    }
                });
            },
            onClick_goToSubMenuDetail(subMenuItem) {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetSubMenuCountByMenuInstanceId",
                    params: {
                        parentMenuInstanceIdText: subMenuItem.MenuInstanceIdText
                    },
                    callback: (error, response) => {
                        console.log("subMenuListComponent.getSubMenuCountByMenuInstanceId.response => ", response);
                        if (!isNaN(response) && response > 0) {

                            vm.$store.commit("setParentMenuInstanceId", subMenuItem.MenuInstanceIdText);
                            window.location.href = vm.$store.state.uiPageName + "#submenuList/" + subMenuItem.MenuInstanceIdText;
                        } else if (subMenuItem.NavigateToUrl !== undefined && subMenuItem.NavigateToUrl !== null && subMenuItem.NavigateToUrl !== "") {

                            window.location.href = vm.$store.state.uiPageName + subMenuItem.NavigateToUrl;
                        }
                    }
                });

            },
            getMyApprovalPendingCount(vm) {
                // let vm = this;
                this.$store.dispatch("dataRequestHandler", {
                    key: "GetMyApprovalPendingCount",
                    params: {},
                    callback(err, response) {
                        if (err) {
                            alert(err);
                            return;
                        }

                        if (response && response.hasOwnProperty("LeaveCount")) {
                            vm.fncVariables.getMyApprovalPendingCount = response.LeaveCount;
                        }
                    }
                });
            },
            getPendingConcessionListCount(vm) {
                this._getConcessionCount(vm, 1, "getPendingConcessionListCount");
            },
            getDeanApprovedConcessionCount(vm) {
                this._getConcessionCount(vm, 2, "getDeanApprovedConcessionCount");
            },
            getDeanRejectedConcessionCount(vm) {
                this._getConcessionCount(vm, 3, "getDeanRejectedConcessionCount");
            },
            getDirectorApprovedConcessionCount(vm) {
                this._getConcessionCount(vm, 4, "getDirectorApprovedConcessionCount");
            },
            getDirectorRejectedConcessionCount(vm) {
                this._getConcessionCount(vm, 5, "getDirectorRejectedConcessionCount");
            },
            getAllConcessionListCount(vm) {
                this._getConcessionCount(vm, 0, "getAllConcessionListCount");
            },
            _getConcessionCount(vm, statusId, variable) {
                this.$store.dispatch("dataRequestHandler", {
                    key: "GetConcessionCountPerUser",
                    params: { statusId: statusId },
                    callback(err, response) {
                        if (err) {
                            alert(err);
                            return;
                        }

                        if (response) {
                            vm.fncVariables[variable] = response[1][0]["ConsessionsCount"];
                        }
                    }
                });
            }
        },
        computed: {
            computedParentMenuInstanceId() {
                return this.$store.state.parentMenuInstanceId;
            }
        },
        watch: {
            computedParentMenuInstanceId() {
                this.getData();
            }
        },
        mounted() {
            this.getData();
        }
    }

</script>