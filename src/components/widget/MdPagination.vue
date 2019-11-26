<template>
    <div class="md-pagination" :style="{textAlign: align}">
        <a-pagination
                showSizeChanger
                showQuickJumper
                :pageSizeOptions="['5', '15', '30', '50', '75', '100']"
                :showTotal="showTotal"
                :pageSize.sync="iSize"
                @showSizeChange="onChange"
                @change="onChange"
                :total="total"
                v-model="page"
        />
    </div>
</template>

<script>
    export default {
        name: 'MdPagination',
        props: {
            size: Number,
            total: Number,
            value: Number,
            align: {
                type: String,
                default: 'right'
            }
        },
        data() {
            return {
                iSize: this.size,
                page: this.value
            };
        },
        methods: {
            async onChange(e) {
                await this.$nextTick();
                this.$emit('change', e);
            },
            showTotal(total) {
                return `共 ${total} 条数据`
            }
        },
        watch: {
            async value(n) {
                await this.$nextTick();
                this.page = n;
            },
            async page(n) {
                await this.$nextTick();
                this.$emit('input', n);
            },
            async size(n) {
                await this.$nextTick();
                this.iSize = n;
            },
            async iSize(n) {
                await this.$nextTick();
                this.$emit('update:size', n);
            }
        }
    };
</script>

<style scoped>

</style>