import { extend, setInteractionMode } from 'vee-validate';
import {
  confirmed,
  email,
  integer,
  max,
  max_value as maxValue,
  min,
  min_value as minValue,
  regex,
  required,
} from 'vee-validate/dist/rules';
import { isValidMobileNumber, isValidPhoneNumber } from '~/utils/phone-number';

setInteractionMode('aggressive', () => ({ on: ['input'], debounce: 200 }));

const Rules = {
  confirmed: 'confirmed',
  email: 'email',
  integer: 'integer',
  maxTextLength: 'max_text_length',
  maxValue: 'max_value',
  minTextLength: 'min_text_length',
  minValue: 'min_value',
  mobileNumber: 'mobile_number',
  phoneNumber: 'phone_number',
  regex: 'regex',
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

  extend(Rules.integer, {
    ...integer,
    message: (fieldName, params) => {
      return app.i18n.t('please-enter-integer');
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

  extend(Rules.maxValue, {
    ...maxValue,
    message: (fieldName, params) => {
      return app.i18n.t('value-must-max', {
        something: params._field_,
        max: params.max,
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

  extend(Rules.minValue, {
    ...minValue,
    message: (fieldName, params) => {
      return app.i18n.t('value-must-min', {
        something: params._field_,
        min: params.min,
      });
    },
  });

  extend(Rules.mobileNumber, {
    validate(value) {
      return isValidMobileNumber(value);
    },
    message: (fieldName, params) => {
      return app.i18n.t('please-enter-valid-mobile');
    },
  });

  extend(Rules.phoneNumber, {
    validate(value) {
      return isValidPhoneNumber(value);
    },
    message: (fieldName, params) => {
      return app.i18n.t('please-enter-valid-phone');
    },
  });

  extend(Rules.regex, {
    ...regex,
    message: (fieldName, params) => {
      return app.i18n.t('please-enter-valid-something', {
        something: params._field_,
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
