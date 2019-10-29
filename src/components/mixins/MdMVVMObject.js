export default {
    props: {
        value: {
            type: Object | String | Number | Array | Boolean
        },
        formRef: {
            type: String,
            default: 'form'
        },
        showValidatorFailMsg: {
            type: Boolean,
            default: true
        },
        failMsg: {
            type: String,
            default: '表单数据不完整'
        }
    },
    data() {
        return {
            data: this.value,
            form: {}
        };
    },
    created() {
        this.form = this.$form.createForm(this, {
            name: 'register'
        });
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
                console.info(err)
            });
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