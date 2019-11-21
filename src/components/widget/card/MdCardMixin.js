export default {
    props: {
        title: {
            type: String
        },
        icon: {
            type: String
        },
        iconStyle: {
            type: Object
        },
        to: {
            type: Object
        }
    },
    computed: {
        isIconFont() {
            return this.icon && this.icon.indexOf('md-icon') !== -1;
        },
        isLink() {
            return this.to;
        }
    },
    methods: {
        goto() {
            if (this.isLink === false) return;
            this.$router.push(this.to);
        }
    }
};
