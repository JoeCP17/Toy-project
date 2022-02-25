import http from "./http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("images", file);

    return http.post("/pred", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }).then((response) => {
        console.log(response.data);
      });
  }

  getFiles() {
    return http.post("/pred");
  }
}

export default new UploadFilesService();
