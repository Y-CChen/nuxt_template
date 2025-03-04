import { extend, setInteractionMode } from 'vee-validate';
import { max, min, required } from 'vee-validate/dist/rules';

setInteractionMode('aggressive', () => ({ on: ['input'], debounce: 200 }));

const Rules = {
  maxTextLength: 'max_text_length',
  minTextLength: 'min_text_length',
  required: 'required',
};

export default function ({ app }, inject) {
  extend('max_text_length', {
    ...max,
    message: (fieldName, params) => {
      return app.i18n.t('length-must-max', {
        something: params._field_,
        length: params.length,
      });
    },
  });

  extend('min_text_length', {
    ...min,
    message: (fieldName, params) => {
      return app.i18n.t('length-must-min', {
        something: params._field_,
        length: params.length,
      });
    },
  });

  extend('required', {
    ...required,
    message: (fieldName, params) => {
      return app.i18n.t('please-enter-something', {
        something: params._field_,
      });
    },
  });

  inject('validate', {
    Rules,
  });
}
