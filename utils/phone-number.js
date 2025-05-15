import {
  isValidPhoneNumber as _isValidPhoneNumber,
  parsePhoneNumber as _parsePhoneNumber,
} from 'libphonenumber-js/max';

function parsePhoneNumber(text) {
  try {
    return _parsePhoneNumber(text, 'TW');
  } catch (error) {
    process.$logger.error(error);
    return undefined;
  }
}

export function isValidPhoneNumber(text) {
  try {
    return _isValidPhoneNumber(text, 'TW');
  } catch (error) {
    process.$logger.error(error);
    return false;
  }
}

export function isValidMobileNumber(text) {
  return (
    isValidPhoneNumber(text) && parsePhoneNumber(text)?.getType() === 'MOBILE'
  );
}

export function formatPhoneNumberNationalWithSpace(text) {
  return parsePhoneNumber(text)?.formatNational() || '';
}

export function formatPhoneNumberNational(text) {
  return formatPhoneNumberNationalWithSpace(text).replaceAll(' ', '');
}
