/**
 * RequireJS的配置文件
 */
require.config({
  baseUrl: '/bxgmy/node_modules',
  paths: {
    jquery: 'jquery/dist/jquery',
    cookie: 'jquery.cookie/jquery.cookie',
    nprogress: './nprogress/nprogress',
    template: 'art-template/lib/template-web',
    bootstrap: 'bootstrap/dist/js/bootstrap',
    datepicker: 'bootstrap-datepicker/dist/js/bootstrap-datepicker',
    validate: 'jquery-validation/dist/jquery.validate',
    form: 'jquery-form/dist/jquery.form.min',
    uploadify: '/bxgmy/assets/libs/uploadify/jquery.uploadify',
    webuploader: './webuploader/dist/webuploader',

    zh:'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    locales: {
      deps: ['jquery', 'datepicker']
    },
    uploadify: {
      deps: ['jquery']
    },
    zh:{
      deps:['jquery','datepicker']
    }
  }
})
