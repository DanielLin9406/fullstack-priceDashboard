import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

const formatDate = (date, format, locale) => {
  return dateFnsFormat(date, format, { locale });
};

export default parseDate;
export { formatDate };
