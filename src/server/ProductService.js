import api from "../boot/Axios";
import snackbar from "../utils/snackbars";

const Snackbar = new snackbar();

export default class ProductService {
  getPosts = async () => {
    try {
      const response = await api.get(`posts`).then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        Snackbar.showErrorToast(
          "Could not get data from server",
          "Network Error"
        );
      }
      if (err.response.status === 403) {
        Snackbar.showErrorToast(
          "User do not have permission to view this page",
          err.response.status
        );
      } else if (err.response.status === 401) {
        Snackbar.showErrorToast("Unautincated user", err.response.status);
      } else {
        Snackbar.showErrorToast("Internal server error", err.response.status);
      }

      return err;
    }
  };

//   discard = async (data) => {
//     try {
//       const response = await api
//         .post(ENDPOINT + `discard`, data)
//         .then((res) => {
//           return res.data.data;
//         });
//       return response;
//     } catch (err) {
//       if (err.code === "ERR_NETWORK") {
//         Snackbar.showErrorToast(
//           "Could not get data from server",
//           "Network Error"
//         );
//       }
//       if (err.response.status === 403) {
//         Snackbar.showErrorToast(
//           "User do not have permission to view this page",
//           err.response.status
//         );
//       } else if (err.response.status === 401) {
//         Snackbar.showErrorToast("Unauthincated user", err.response.status);
//       } else {
//         Snackbar.showErrorToast("Internal server error", err.response.status);
//       }

//       return err;
//     }
//   };
}
