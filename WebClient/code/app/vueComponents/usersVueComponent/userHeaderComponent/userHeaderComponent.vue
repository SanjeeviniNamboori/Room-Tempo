<template src="./userHeaderComponent.template.html"></template>
<script>
    export default {
        // options
        name: "userHeaderComponent",
        props: ["col"],
        data() {
            return {
                currCol: undefined,
                move: undefined,
                stop: undefined,
                startClientRectLeft: undefined,
                size: undefined,
                percentage: undefined,
                table: undefined,
                width: 250
            };
        },
        methods: {
            createNewInstance: function () {
                //console.log('createNewInstance');
                //if()
                let uiPageName = this.$store.state.uiPageName;
                let requestParams = {
                    entityId: this.entityId,
                    type: "entityInstance",
                    parentId: this.parentId,
                    parentType: this.parentType,
                    parentPath: this.parentType === "client" ? [] : this.$store.state.entityInstance[this.parentId.toString()].response.parentPath.concat([Number(this.parentId)]),
                    clientId: this.clientId,
                    navigateToDetail: true
                    // callback: function (newCbkey) {
                    //     window.location.href = uiPageName + "#client/" + requestParams.clientId + "/instance/" + newCbkey;
                    // }
                };
                this.$store.dispatch("createNewInstance", requestParams);
            },
            getData: function () {
                //call action to get data
                this.$store.dispatch("getUserList", { type: "user", parentType: this.parentType, entityId: this.entityId, paramId: this.paramId })
            },
            editParentInstance: function () {
                window.location.href = this.$store.state.uiPageName + "#client/" + this.clientId + "/entity/" + this.entityId + "/edit";
            },
            setWidth: function (elem, width) {
                elem.style.width = width + "px";
            },
            startDragging: function (e) {
                e.preventDefault();
                //console.log("Dragged");
                this.currCol = e.target.parentElement;
                this.move = this.drag;
                this.stop = this.stopDragging;
                this.table = this.currCol.parentElement.parentElement.parentElement;
                window.addEventListener('mouseup', this.stop);
                window.addEventListener('touchend', this.stop);
                window.addEventListener('touchcancel', this.stop);
                this.table.addEventListener('mousemove', this.move);
                this.table.addEventListener('touchmove', this.move);
                this.currCol.style.userSelect = 'none';
                this.currCol.style.webkitUserSelect = 'none';
                this.currCol.style.MozUserSelect = 'none';
                this.currCol.style.pointerEvents = 'none';
                this.table.style.cursor = "ew-resize";
                var computedStyle = window.getComputedStyle(this.table);
                var parentSize = this.table.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
                this.startClientRectLeft = this.currCol.getBoundingClientRect()["left"];
            },
            drag: function (e) {
                var offset;
                if ('touches' in e) {
                    offset = e.touches[0]["clientX"] - this.startClientRectLeft
                } else {
                    offset = e["clientX"] - this.startClientRectLeft
                }
                //console.log(offset);
                this.width = offset;
                this.setWidth(this.currCol, offset);
            },
            stopDragging: function () {
                window.removeEventListener('mouseup', this.stop);
                window.removeEventListener('touchend', this.stop);
                window.removeEventListener('touchcancel', this.stop);
                this.table.removeEventListener('mousemove', this.move);
                this.table.removeEventListener('touchmove', this.move);
                this.currCol.style.userSelect = '';
                this.currCol.style.webkitUserSelect = '';
                this.currCol.style.MozUserSelect = '';
                this.currCol.style.pointerEvents = '';
                this.table.style.cursor = "";
                this.currCol = undefined;
                this.move = undefined;
                this.stop = undefined;
                this.startClientRectLeft = undefined,
                this.size = undefined,
                this.percentage = undefined;
            }
        },
        computed: {
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
            //this.getData();
        }
    }
</script>