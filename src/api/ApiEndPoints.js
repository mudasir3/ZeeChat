import APIBaseUrl from './ApiUrl';
import axios from 'axios';

export const authenticateUser = (params) => {
  console.log(
    'registerUser ' +
      JSON.stringify(params) +
      ' url ' +
      APIBaseUrl.HOST +
      APIBaseUrl.AUTHENTICATE,
  );

  return axios.post(
    APIBaseUrl.HOST + APIBaseUrl.AUTHENTICATE,
    JSON.stringify(params),
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
};

export const socialLogin = (params) => {
  console.log(
    'socialLogin ' +
      JSON.stringify(params) +
      ' url ' +
      APIBaseUrl.HOST +
      APIBaseUrl.SOCIAL,
  );

  return axios.post(
    APIBaseUrl.HOST + APIBaseUrl.SOCIAL,
    JSON.stringify(params),
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
};

export const fbgraphapi = (token) => {
  return axios.get(
    `https://graph.facebook.com/v9.0/me?fields=id,email,name,first_name,last_name,picture&access_token=${token}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token
      },
    },
  );
};

export const getRooms = (token) => {
  console.log(
    'getRooms token' + token + ' url ' + APIBaseUrl.HOST + APIBaseUrl.GETROOMS,
  );

  return axios.get(APIBaseUrl.HOST + APIBaseUrl.GETROOMS, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const createRooms = (token, params) => {
  console.log(
    'CREATE ROOM PARAMS ' +
      JSON.stringify(params) +
      ' url ' +
      APIBaseUrl.HOST +
      APIBaseUrl.CREATEROOMS +
      ' TOKEN ' +
      token,
  );

  return axios.post(APIBaseUrl.HOST + APIBaseUrl.CREATEROOMS, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getMessages = (token) => {
  console.log(
    'GETMESSAGES token' +
      token +
      ' url ' +
      APIBaseUrl.HOST +
      APIBaseUrl.GETMESSAGES,
  );

  return axios.get(APIBaseUrl.HOST + APIBaseUrl.GETMESSAGES, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const sendMessage = (token, params) => {
  console.log(
    'SENDMESSAGE token' +
      token +
      ' url ' +
      APIBaseUrl.HOST +
      APIBaseUrl.SENDMESSAGE +
      params,
  );

  return axios.post(APIBaseUrl.HOST + APIBaseUrl.SENDMESSAGE, params, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const JoinRoom = (token, params) => {
  console.log(
    'JoinRoom token' +
      token +
      ' url ' +
      APIBaseUrl.HOST +
      APIBaseUrl.JOINRROOM +
      ' params ' +
      JSON.stringify(params),
  );

  return axios.post(APIBaseUrl.HOST + APIBaseUrl.JOINRROOM, params, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const SendGift = (token, params) => {
  console.log(
    'SENDGIFT token' +
      token +
      ' url ' +
      APIBaseUrl.HOST +
      APIBaseUrl.SENDGIFT +
      ' params ' +
      JSON.stringify(params),
  );

  return axios.post(APIBaseUrl.HOST + APIBaseUrl.SENDGIFT, params, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};
