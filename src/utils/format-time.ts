import moment from './moment'

export default (time: string) => moment(time).calendar(null, {
  sameDay: '[Сегодня], HH:mm',
  nextDay: '[Завтра], HH:mm',
  nextWeek: '[На следующей неделе], dddd HH:mm',
  lastDay: '[Вчера], HH:mm',
  lastWeek: '[На прошлой неделе], dddd HH:mm',
  sameElse: 'DD.MM.YYYY, HH:mm'
});
