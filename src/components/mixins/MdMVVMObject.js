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
            data: this.value,
        };
    },
    created() {
    },
    methods: {
        onSubmit() {
            this.$emit('submit', this.data);
        }
    },
    watch: {
        async value(n) {
            await this.$nextTick();
            this.data = n;
        },
        async data() {
            await this.$nextTick();
            this.$emit('input', this.data);
        }
    }
};
