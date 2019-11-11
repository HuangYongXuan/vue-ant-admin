<template>
    <div class="md-setting">
        <md-image-preview :src="src" :images="images"/>
    </div>
</template>

<script>

    import MdImagePreview from '@/components/widget/MdImagePreview';
    export default {
        components: {MdImagePreview},
        data() {
            return {
                src: 'http://10.100.57.41:8080/static/resource/4e62106f220b79a0108bcbb55769d880.png',
                images: [
                    'http://10.100.57.41:8080/static/resource/4e62106f220b79a0108bcbb55769d880.png',
                    'http://127.0.0.1:8080/static/resource/33d6b38aca2e6fa58c9b00d303641c07.jpg',
                    'http://10.100.57.41:8080/static/resource/4642db2338d3b0ab1e5b4dc551f932e2.jpeg'
                ]
            };
        }
    };
</script>

<style scoped lang="scss">
    .md-setting {
    }
</style>
