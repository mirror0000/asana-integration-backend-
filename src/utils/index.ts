const dataCenterUrl = {
  au: {
    api: 'https://projectsapi.clickup.com.au/restapi',
    accounts: 'https://accounts.clickup.com.au',
  },
  eu: {
    api: 'https://projectsapi.clickup.eu/restapi',
    accounts: 'https://accounts.clickup.eu',
  },
  in: {
    api: 'https://projectsapi.clickup.in/restapi',
    accounts: 'https://accounts.clickup.in',
  },
  us: {
    api: 'https://projectsapi.clickup.com/restapi',
    accounts: 'https://accounts.clickup.com',
  },
  jp: {
    api: 'https://projectsapi.clickup.jp/restapi',
    accounts: 'https://accounts.clickup.jp',
  },
  uk: {
    api: 'https://projectsapi.clickup.co.uk/restapi',
    accounts: 'https://accounts.clickup.co.uk',
  },
};

export const getDataCenterUrl = (location) => {
  if (dataCenterUrl[location]) {
    return dataCenterUrl[location];
  } else {
    return {
      api: `https://projectsapi.clickup.com.${location}/restapi`,
      accounts: `https://accounts.clickup.co.${location}`,
    };
  }
};
