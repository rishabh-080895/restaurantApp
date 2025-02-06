    export enum menuFilterEnums {
        veg = 'veg',
        non_veg = 'non_veg',
        vegan = 'vegan',
        egg = 'egg'
    };

  export function isValueNullOrEmpty(value) {
    let isValue = false;
    if (value && value.toString) {
      value = value.toString();
    }
    if (
      value == null ||
      value === '' ||
      value === '.' ||
      value === 'null' ||
      value === undefined ||
      value === '0' ||
      value?.length === 0
    ) {
      isValue = true;
    }
    return isValue;
  };