<template>
    <div class="md-setting">
        <md-json-editor v-model="data"/>
    </div>
</template>

<script>

    import MdJsonEditor from '@/components/widget/editor/MdJsonEditor';
    export default {
        components: {MdJsonEditor},
        data() {
            return {
                data: {
                    id: '123',
                    name: '789'
                }
            };
        }
    };
</script>

<style scoped lang="scss">
    .md-setting {
    }
</style>
