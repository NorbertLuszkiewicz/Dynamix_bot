import axios from 'axios';
import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILURE,
  CONNECT_STREAMELEMENTS_REQUEST,
  CONNECT_STREAMELEMENTS_SUCCESS,
  CONNECT_STREAMELEMENTS_FAILURE,
  CHANGE_VOLUME_REQUEST,
  CHANGE_VOLUME_SUCCESS,
  CHANGE_VOLUME_FAILURE,
  ADD_RIOT_REQUEST,
  ADD_RIOT_SUCCESS,
  ADD_RIOT_FAILURE,
  ADD_SLOTS_REQUEST,
  ADD_SLOTS_SUCCESS,
  ADD_SLOTS_FAILURE,
  CHANGE_COMMAND_SWITCH_REQUEST,
  CHANGE_COMMAND_SWITCH_SUCCESS,
  CHANGE_COMMAND_SWITCH_FAILURE,
  REMOVE_SLOT_REQUEST,
  REMOVE_SLOT_SUCCESS,
  REMOVE_SLOT_FAILURE,
  DESTROY_SESSION,
} from 'reducers';

const url = 'https://dynamix-bot.glitch.me/';

export const getAccount = (name, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_ACCOUNT_REQUEST });
    let trueName = null;
    let trueToken = null;

    if (name && token) {
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      trueName = name;
      trueToken = token;
    } else {
      trueName = localStorage.getItem('name');
      trueToken = localStorage.getItem('token');
    }

    const { data } = await axios.get(`${url}account?name=${trueName}&token=${trueToken}`);

    dispatch({ type: GET_ACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ACCOUNT_FAILURE, payload: error.message });
  }
};

export const connectStreamElements = (clientID, token, user) => async (dispatch) => {
  try {
    dispatch({ type: CONNECT_STREAMELEMENTS_REQUEST });

    await axios.put(`${url}streamelements`, { clientID, token, user });

    dispatch({ type: CONNECT_STREAMELEMENTS_SUCCESS });
  } catch (error) {
    dispatch({ type: CONNECT_STREAMELEMENTS_FAILURE, payload: error.message });
  }
};

export const addChangeVolumeAward = (min, max, minSR, maxSR, time, user) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_VOLUME_REQUEST });

    await axios.put(`${url}volumeaward`, { min, max, minSR, maxSR, time, user });

    dispatch({ type: CHANGE_VOLUME_SUCCESS });
  } catch (error) {
    dispatch({ type: CHANGE_VOLUME_FAILURE, payload: error.message });
  }
};

export const addRiotAccount = (name, server, user) => async (dispatch) => {
  try {
    dispatch({ type: ADD_RIOT_REQUEST });

    await axios.put(`${url}riot`, { name, server, user });

    dispatch({ type: ADD_RIOT_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_RIOT_FAILURE, payload: error.message });
  }
};

export const addSlotsAward = (name, emotes, withBan, user) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SLOTS_REQUEST });

    await axios.put(`${url}slots`, { name, emotes, withBan, user });

    dispatch({ type: ADD_SLOTS_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_SLOTS_FAILURE, payload: error.message });
  }
};

export const changeCommandSwitch = (user, body) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_COMMAND_SWITCH_REQUEST });

    await axios.put(`${url}command_switch`, { user, body });

    dispatch({ type: CHANGE_COMMAND_SWITCH_SUCCESS });
  } catch (error) {
    dispatch({ type: CHANGE_COMMAND_SWITCH_FAILURE, payload: error.message });
  }
};

export const removeSlot = (id, streamer) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_SLOT_REQUEST });

    await axios.put(`${url}slot_remove`, { id, streamer });

    dispatch({ type: REMOVE_SLOT_SUCCESS });
  } catch (error) {
    dispatch({ type: REMOVE_SLOT_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    dispatch({ type: DESTROY_SESSION });
  } catch (error) {
    console.log(error);
  }
};
