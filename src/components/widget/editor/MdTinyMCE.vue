<template>
    <a-spin :spinning="spinning">
        <div :id="id">
            {{data}}
        </div>
    </a-spin>
</template>

<script>
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import {generateUuid} from '@/common/Utils';
    import fileSystem from '@/common/apis/fileSystem';

    export default {
        name: 'MdTinyMCE',
        mixins: [MdMVVMObject],
        props: {
            id: {
                type: String,
                default: () => generateUuid('tint-mce-')
            },
            // see https://www.tiny.cloud/docs/quick-start/
            options: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                spinning: false,
                scriptId: 'tiny-mce'
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let options = Object.assign(
                    {
                        language: 'zh_CN',
                        plugins: 'print preview fullpage paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                        imagetools_cors_hosts: ['picsum.photos'],
                        menubar: 'file edit view insert format tools table help',
                        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                        toolbar_sticky: true,
                        autosave_ask_before_unload: true,
                        autosave_interval: "30s",
                        autosave_prefix: "{path}{query}-{id}-",
                        autosave_restore_when_empty: false,
                        autosave_retention: "2m",
                        image_advtab: true,
                        content_css: [
                            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                            '//www.tiny.cloud/css/codepen.min.css'
                        ],
                        link_list: [
                            { title: 'My page 1', value: 'http://www.tinymce.com' },
                            { title: 'My page 2', value: 'http://www.moxiecode.com' }
                        ],
                        image_list: [
                            { title: 'My page 1', value: 'http://www.tinymce.com' },
                            { title: 'My page 2', value: 'http://www.moxiecode.com' }
                        ],
                        image_class_list: [
                            { title: 'None', value: '' },
                            { title: 'Some class', value: 'class-name' }
                        ],
                        importcss_append: true,
                        height: 400,
                        file_picker_callback: function (callback, value, meta) {
                            /* Provide file and text for the link dialog */
                            if (meta.filetype === 'file') {
                                callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                            }

                            /* Provide image and alt text for the image dialog */
                            if (meta.filetype === 'image') {
                                callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                            }

                            /* Provide alternative source and posted for the media dialog */
                            if (meta.filetype === 'media') {
                                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                            }
                        },
                        templates: [
                            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                        ],
                        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                        height: 600,
                        image_caption: true,
                        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                        noneditable_noneditable_class: "mceNonEditable",
                        toolbar_drawer: 'sliding',
                        contextmenu: "link image imagetools table",
                        images_upload_handler: this.uploadImages
                    },
                    this.options, {
                        selector: '#' + this.id
                    }
                );
                let mce = document.getElementById(this.scriptId);
                if (mce !== null) {
                    tinymce.init(options);
                } else {
                    this.spinning = true;
                    this.loadScript(mce).then(() => {
                        tinymce.init(options);
                    }).finally(() => this.spinning = false);
                }
            },
            loadScript(mce) {
                let url = 'https://cdn.jsdelivr.net/npm/editor-mce@5.1.1/tinymce.min.js';
                return new Promise((resolve, reject) => {
                    if (mce === null) {
                        let script = document.createElement('script');
                        script.setAttribute('id', this.scriptId);
                        script.type = 'text/javascript';
                        script.src = url;
                        script.onload = () => {
                            return resolve();
                        };
                        script.error = (err) => {
                            return reject(err);
                        };
                        document.body.appendChild(script);
                    } else {
                        return resolve();
                    }
                });
            },
            uploadImages (blobInfo, success, failure) {
                let formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                this.spinning = true;
                fileSystem.upload(formData).then(res => {
                    this.$utils.responseHandler(res).then(({data}) => {
                        try {
                            success(this._getImageFullPath(data.savePath))
                        } catch (e) {
                            failure(e)
                        }
                    }).catch(() => {
                        console.info('err:', res.data.message);
                        failure(res.data.message)
                    })
                }).finally(() => this.spinning = false)
            }
        }
    };
</script>

<style scoped>

</style>
