import {storageLocal} from '../../../constants/common';
import {AppDispatch} from '../../../redux/store/store';

export const ifJson = (type: string, func: any, dispatch: AppDispatch) => {
  const json = storageLocal.getString(type);
  if (json !== undefined) {
    const userObject = JSON.parse(json);
    dispatch(func(userObject));
  }
};
