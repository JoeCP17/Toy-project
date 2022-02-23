import React, {useState} from "react";
import "./App.css";
import { Typography } from "@material-ui/core";
import UploadImages from "./components/upload-images.component";
import Output from "./components/Output";

function App() {

  return (
    <div className="container">
      <div className="mg20">
        <Typography variant="h5">숫자 탐색기</Typography>
        <Typography variant="h6">이미지를 업로드하세요</Typography>
      </div>
      <UploadImages />
      <Output></Output>
    </div>
    
  );
}

export default App;
