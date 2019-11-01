<template>
    <a-col :xs="res.xs" :sm="res.sm" :md="res.md" :lg="res.lg" :xl="res.xl" :xxl="res.xxl" class="md-responsive-col">
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
                        sm: 24,
                        md: 12,
                        lg: 12,
                        xl: 8,
                        xxl: 6
                    };
                }
            }
        }
    };
</script>

<style scoped>

</style>
