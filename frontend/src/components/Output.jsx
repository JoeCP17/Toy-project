import React, { useState, useEffect } from "react";
import axios from "axios";
import useAsync from "./useAsync";


async function getData() {
    const response = await axios.post("/pred");
    return response.data;
  }


function Data() {
    const [state, refetch] = useAsync(getData, [], true);
    const { loading, data: result_data, error } = state;
    const [effect, setEffect] = useState("mount1");
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!result_data)
        return (
        <div onClick={refetch}>
            <button>불러오기</button>
        </div>
        );

     return (
    <>
      <div className="result_data">
        <div className={`box-wrap ${effect}`}>
          {/* <div className="box2"> */}
          <ul>
            {result_data}
          </ul>
          {/* </div> */}
        </div>
      </div>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}


export default Data;