import { setAlertData } from "../store/home";

export const setAlert = (type, content, options) => async (dispatch) => {
  if (type) {
    dispatch(
      setAlertData({
        type,
        content,
        options,
        showAlert: true,
      })
    );
  }
};
