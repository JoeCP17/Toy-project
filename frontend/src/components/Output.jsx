import React, { useState, useEffect } from "react";
import axios from "axios";
import useAsync from "./useAsync";


async function getData() {
    const response = await axios.post("/pred");
    return response.data;
  } 


function Data() {
    const [state, refetch] = useAsync(getData, [], true);
    const { loading, data: pred, error } = state;
    const [effect, setEffect] = useState("mount1");
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!pred)
        return (
        <div>
            <button onClick={refetch}>불러오기</button>
        </div>
        )
     return (
        <ul>
        {pred.map(result => (
          <li>
            {result.index}
            {result.percent}
          </li>
        ))}
      </ul>
  );
}


export default Data;