<template>
    <div class="md-json-editor">
        <textarea ref="textarea"></textarea>
    </div>
</template>

<script>

    import CodeMirror from 'codemirror';
    import 'codemirror/addon/lint/lint.css';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/rubyblue.css';
    import 'codemirror/mode/javascript/javascript';
    import 'codemirror/addon/lint/lint';
    import 'codemirror/addon/lint/json-lint';
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    require('script-loader!jsonlint');

    export default {
        name: 'MdJsonEditor',
        mixins: [MdMVVMObject],
        data() {
            return {
                editor: undefined
            };
        },
        mounted() {
            this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
                lineNumbers: true,
                mode: 'application/json',
                gutters: ['CodeMirror-lint-markers'],
                theme: 'rubyblue',
                lint: true
            });

            this.editor.setValue(JSON.stringify(this.value, null, 2));
            this.editor.on('change', cm => {
                this.$emit('changed', cm.getValue());
                this.$emit('input', cm.getValue());
            });
        },
        methods: {
            watchValue() {
                if (!this.editor) return;
                const editorValue = this.editor.getValue();
                if (this.value !== editorValue) {
                    this.editor.setValue(JSON.stringify(this.value, null, 2));
                }
            },

            getValue() {
                return this.editor.getValue();
            }
        }
    };
</script>

<style scoped>

</style>
