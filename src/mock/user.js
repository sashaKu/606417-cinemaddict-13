export const generateUser = () => {

  return {
    state: `Movie Buff`,
    avatar: `bitmap@2x.png`,
    piriod: {
      all: true,
      today: false,
      week: false,
      mounth: false,
      years: false
    },
    watched: 22,
    duration: {
      hours: 130,
      minutes: 22
    },
    genre: `Sci-Fi`
  };
};
