export const updatedObject = (oldObject, updatedPropsAsObject) => {
  return {
    ...oldObject,
    ...updatedPropsAsObject,
  };
};
