import React, {useEffect, useState} from "react";
import "./App.css";
import { Typography } from "@material-ui/core";
import axios from 'axios';
import UploadImages from "./components/upload-images.component";
import UploadService from "./services/upload-files.service";



const App = ()  => {
  const [data, setData] = useState(null);
  const onClick = ()=>{
    axios.post('/pred').then(response => {
      setData(response.json())
    }).catch((err) => {
      console.log("결과에러", err);
    })
  }

  return (
    <div className="container">
      <div className="mg20">
        <Typography variant="h5">숫자 탐색기</Typography>
        <Typography variant="h6">이미지를 업로드하세요</Typography>
      </div>
      <UploadImages />
      <button onClick={onClick}>불러오기</button>
      {data && <textarea rows={1} value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
    

  );
}

export default App;
