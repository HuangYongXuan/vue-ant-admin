export default {
    data () {
        return {
            table: {
                rows: [],
                count: 0
            },
            dialog: {
                status: {
                    create: false,
                    edit: false,
                    delete: false
                },
                data: {
                    old: {},
                    create: {},
                    edit: {},
                    delete: {}
                }
            }
        }
    }
}