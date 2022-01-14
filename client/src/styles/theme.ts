const theme = {
  colors: {
    primary: '#5b36ac',
  },
};

const greyColors = {
  grey100: '#EFEFEF',
  grey200: '#BBBBBB',
  grey300: '#1d2022',
  grey400: '#353c40',
  grey800: '#121517',
};

const highLightColors = {
  red: '#E15A60',
  yellow: '#FAC863',
  blue: '#6699CC',
  green: '#99C794',
  purple: '#A661EB',
};

export const colors = {
  ...greyColors,
  ...highLightColors,

  background: greyColors.grey300,
  backgroundHighLight: greyColors.grey300,
  backgroundLight: greyColors.grey400,
  backgroundDark: greyColors.grey800,

  fontDefault: greyColors.grey200,
};

export const fontSize = {
  t1: 24,
  t2: 18,
  t3: 15,
  t4: 13,
};

export default theme;
