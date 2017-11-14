<template src="./userListComponent.template.html"></template>
<script>
    export default {
        // options
        name: "userListComponent",
        props: [],
        data() {
            return {
                userList: [],
                listType: 'list'
            };
        },
        methods: {
            createNewInstance: function () {
                let uiPageName = this.$store.state.uiPageName;
                window.location.href = uiPageName + "#user/0"
            },
            getData: function () {
                //call action to get data
                let self = this;
                this.$store.dispatch("dataRequestHandler", {
                    key: "GetUserList", params: {}, callback: function (err, response) {
                        self.userList = response[0];
                    }
                })
            },
            editParentInstance: function () {
                window.location.href = this.$store.state.uiPageName + "#client/" + this.clientId + "/entity/" + this.entityId + "/edit";
            },
            editUser: function (userObj) {
                //console.log(userObj);
                window.location.href = this.$store.state.uiPageName + "#user/" + userObj.vwUserIdText;
            },
            switchView() {
                if (this.listType == 'list')
                    this.listType = 'card';
                else
                    this.listType = 'list';
            }
        },
        computed: {
            // userList() {
            //     let instanceObj = this.$store.getters.getUserList({ type: "user" });
            //     if (instanceObj && instanceObj.user && Array.isArray(instanceObj.user.response)) {
            //         return instanceObj.user.response;
            //     }
            //     return [];
            // },
            // entity() {
            //     return this.$store.getters.getEntity(this.entityId);
            // },
            columns() {
                //if (this.entity && this.entity.status === "success") {
                // let entity = this.user.response;
                // let columns = this.entity.response.layoutFields.map(l => { return entity.parameters[l.toString()] });
                // return columns.filter(c => {
                //     return c.dataTypeId !== 6 && (c.dataTypeId !== 9 || (c.dataTypeId === 9 && c.relationshipType === 1 && (c.entityId || c.parentParamId)))
                // })
                // }
                return [{ "label": "First Name" }, { "label": "Last Name" }, { "label": "Email" }, { "label": "Reporting Manager" },
                { "label": "LoginId" }, { "label": "Campus Name" }, { "label": "Designation" }]
            }
        },
        watch: {
            // parentId: function (value) {
            //     this.getData();
            // },
            // parentType: function (value) {
            //     this.getData();
            // },
            // entityId: function (value) {
            //     this.getData();
            // },
            // clientId: function (value) {
            //     this.getData();
            // },
            // paramId: function (value) {
            //     this.getData();
            // }
        },
        mounted() {
            this.getData();
        }
    }

</script>