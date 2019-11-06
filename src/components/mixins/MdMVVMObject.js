export default {
    props: {
        value: {
            type: Object | String | Number | Array | Boolean
        },
        formRef: {
            type: String,
            default: 'form'
        }
    },
    data() {
        return {
            data: this.value
        };
    },
    created() {
    },
    methods: {
        onSubmit() {
            this.$emit('submit', this.data);
        },
        watchData() {

        },
        watchValue() {

        }
    },
    watch: {
        async value(n) {
            await this.$nextTick();
            this.data = n;
            this.watchValue();
        },
        async data() {
            await this.$nextTick();
            this.$emit('input', this.data);
            this.watchData();
        }
    }
};
