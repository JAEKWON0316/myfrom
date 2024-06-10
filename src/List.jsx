import React from 'react'

const List = ({resMessage}) => {  //list는 서버로 받은 body값을 출력하는 것!
if(!resMessage) {
    return <div>Loading...</div>;
}  
  return (
    <div>
      <ul>
        <li><label>이름</label>{resMessage.username}</li> 
        <li><label>비밀번호</label>{resMessage.userpass}</li>
        <li><label>제목</label>{resMessage.title}</li>
        <li><label>내용</label>{resMessage.contents}</li>
      </ul>
    </div>
  )
}

export default List