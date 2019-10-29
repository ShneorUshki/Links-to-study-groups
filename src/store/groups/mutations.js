export const updateDataGroups = (state, values) => {
  let data = getIcon(values[0].data, values[1].data);

  state.dataGroup = data;
};

function getIcon(data, groupType) {
  for (let type in groupType) {
    for (let obi in data) {
      let item = data[obi].groupType;
      if (item === groupType[type].name) {
        data[obi].groupType = groupType[type];
      }
    }
  }
  return data;
}
