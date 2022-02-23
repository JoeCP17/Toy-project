import React, {useState} from "react";
import "./App.css";
import { Typography } from "@material-ui/core";

import UploadImages from "./components/upload-images.component";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios
      .post("/pred")
      .then((response) => {
        setData(response.data);
      });
    };
  return (
    <div className="container">
      <div className="mg20">
        <Typography variant="h5">숫자 탐색기</Typography>
        <Typography variant="h6">이미지를 업로드하세요</Typography>
      </div>

      <UploadImages />

      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}

    </div>
  );
}

export default App;
