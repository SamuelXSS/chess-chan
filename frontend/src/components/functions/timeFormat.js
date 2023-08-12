const timeFormats = {
  '60': '(1min)',
  '180': '(3min)',
  '300': '(5min)',
  '600': '(10min)',
  '1800': '(30min)',
  '60|1': '(1|1)',
  '120|1': '(2|1)',
  '180|2': '(3|2)',
  '900|100': '(15|10)',
};

const getFormattedTime = (time) => timeFormats[time] || `(${time})`;

export default getFormattedTime;
