import { extend, setInteractionMode } from 'vee-validate';
import { confirmed, email, max, min, required } from 'vee-validate/dist/rules';

setInteractionMode('aggressive', () => ({ on: ['input'], debounce: 200 }));

const Rules = {
  confirmed: 'confirmed',
  email: 'email',
  maxTextLength: 'max_text_length',
  minTextLength: 'min_text_length',
  required: 'required',
};

export default function ({ app }, inject) {
  extend(Rules.confirmed, {
    ...confirmed,
    message: (fieldName, params) => {
      return app.i18n.t('something-not-match-target', {
        something: params._field_,
        target: params.target,
      });
    },
  });

  extend(Rules.email, {
    ...email,
    message: (fieldName, params) => {
      return app.i18n.t('please-enter-valid-email');
    },
  });

  extend(Rules.maxTextLength, {
    ...max,
    message: (fieldName, params) => {
      return app.i18n.t('length-must-max', {
        something: params._field_,
        length: params.length,
      });
    },
  });

  extend(Rules.minTextLength, {
    ...min,
    message: (fieldName, params) => {
      return app.i18n.t('length-must-min', {
        something: params._field_,
        length: params.length,
      });
    },
  });

  extend(Rules.required, {
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
