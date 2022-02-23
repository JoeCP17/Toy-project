import React, { useState, useEffect } from 'react';
import axios from 'axios';

function output() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 data 를 초기화하고
      setError(null);
      setData(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.post(
        '/pred'
      );
      setData(response.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return null;
  return (
    <>
      <ul>
        {data.map(result => (
          <li>
            숫자 : {result.index} 
            일치율 : ({result.precent})
          </li>
        ))}
      </ul>
      <button onClick={getData}>불러오기</button>
    </>
  );
}

export default output;