import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

/**
 * Parses a date string into a Date object.
 * 
 * @param {string} str - The date string to parse.
 * @param {string} format - The format of the date string (e.g., 'YYYY-MM-DD').
 * @param {Object} locale - The locale object for localization.
 * @returns {Date|undefined} The parsed Date object or undefined if invalid.
 */
const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

/**
 * Formats a Date object into a string.
 * 
 * @param {Date} date - The date to format.
 * @param {string} format - The output format string.
 * @param {Object} locale - The locale object for localization.
 * @returns {string} The formatted date string.
 */
const formatDate = (date, format, locale) => {
  return dateFnsFormat(date, format, { locale });
};

export default parseDate;
export { formatDate };
