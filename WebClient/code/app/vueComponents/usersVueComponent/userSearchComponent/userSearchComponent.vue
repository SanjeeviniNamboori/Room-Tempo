<style scoped src="./userSearchComponent.css"></style>
<template src="./userSearchComponent.template.html"></template>
<script>
    export default {
        // options
        name: "userSearchComponent",
        props: ["toggleSearch", "assignRelation", "onSearch", "resultsArray", "value"],
        data() {
            return {
                query: '',
                current: -1,
                loading: false,
                selectFirst: false,
                //if needed, get these from above
                limit: 5,
                minChars: 3,
                timer: null
            }
        },
        methods: {
            getData() {
                this.query = this.value;
                //this.$store.dispatch("getDataByType", { type: "entity", cbkey: this.entityId.toString() })
            },
            update() {
                window.clearTimeout(this.timer);

                if (!this.query) {
                    this.query = "";
                    return this.reset()
                }

                if (this.minChars && this.query.length < this.minChars) {
                    return
                }

                this.loading = true

                let that = this;

                this.timer = window.setTimeout(() => {

                    that.onSearch({ "query": that.query });

                }, 500);
            },
            handleSeachResult: function (response) {
                //this.resultsArray = this.limit ? this.resultsArray.slice(0, this.limit) : this.resultsArray
                this.current = -1
                this.loading = false

                if (this.selectFirst) {
                    this.down()
                }
            },

            reset(item) {
                //this.resultsArray = []                
                this.loading = false
                this.toggleSearch(false);
                //this.query = "";                
            },

            setActive(index) {
                this.current = index
            },

            activeClass(index) {
                return {
                    active: this.current === index
                }
            },

            hit() {
                if (this.current !== -1) {
                    this.onHit(this.resultsArray[this.current])
                }
            },

            up() {
                if (this.current > 0) {
                    this.current--
                } else if (this.current === -1) {
                    this.current = this.resultsArray.length - 1
                } else {
                    this.current = -1
                }
            },

            down() {
                if (this.current < this.resultsArray.length - 1) {
                    this.current++
                } else {
                    this.current = -1
                }
            },

            onHit(item) {
                this.assignRelation(item);
                this.reset();
                if (item)
                    this.query = item.FirstName + " " + item.LastName;
            }
        },
        computed: {
            hasItems() {
                return this.resultsArray && this.resultsArray.length > 0
            },

            isEmpty() {
                return !this.query
            },

            isDirty() {
                return !!this.query
            },
            entity() {
                if (this.entityId) {
                    let _entity = this.$store.getters.getEntity(this.entityId.toString())
                    if (_entity && _entity.response) {
                        return _entity.response;
                    }
                }
                return null;
            }
        },
        watch: {
            resultsArray: function (value) {
                this.handleSeachResult();
            },
            value() {
                this.getData();
            }
        },
        mounted() {
            this.getData();
        }
    }

</script>