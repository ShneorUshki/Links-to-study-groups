import axios from "axios";

import { Loading } from "quasar";
import { URL } from "../../boot/servises";

export const getDataGroups = ({ commit }) => {
  Loading.show();
  const data = axios.get(URL + "group/all");

  const groupType = axios.get(URL + "group-type");

  Promise.all([data, groupType]).then(function(values) {
    commit("updateDataGroups", values);
  });
  Loading.hide();
};

export const addGroup = ({ dispatch }, newGroup) => {
  Loading.show();
  axios
    .post(URL + "group/add", newGroup)
    .then(function() {
      dispatch("getDataGroups");
    })
    .catch(function() {
      //console.log(error);
    });
};
