<template>
    <a-col :xs="res.xs" :sm="res.sm" :md="res.md" :lg="res.lg" :xl="res.xl" :xxl="res.xxl">
        <slot/>
    </a-col>
</template>

<script>
    export default {
        name: 'ResponsiveCol',
        props: {
            res: {
                type: Object,
                default: () => {
                    return {
                        xs: 24,
                        sm: 12,
                        md: 8,
                        lg: 8,
                        xl: 6,
                        xxl: 4
                    };
                }
            }
        }
    };
</script>

<style scoped>

</style>
