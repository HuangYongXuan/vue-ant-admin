<template>
    <span v-html="format"></span>
</template>

<script>
    export default {
        name: 'FormatDatetime',
        props: {
            datetime: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                date: this.datetime
            };
        },
        watch: {
            datetime(n) {
                this.date = n;
            }
        },
        computed: {
            format() {
                try {
                    if (!this.date) return '';
                    let rem = this.date.split('.');
                    let arr = rem[0].split(' ');
                    let html = '';
                    for (let k in arr) {
                        html += `<p class="__p">${arr[k]}</p>`;
                    }
                    return html;
                } catch (e) {
                    return this.date;
                }
            }
        }
    }
</script>

<style>
    .__p {
        margin: 0;
        padding: 0;
        font-size: 10px;
    }
</style>
