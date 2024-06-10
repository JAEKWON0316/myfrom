import React, { useState } from 'react'
import axios from 'axios'
import List from './List'

const Form = () => { //여기에 다시 가져와야 변동이 일어난다.
  const [formData, setFormData] = useState({ //안에 object타입으로 받는다 object타입은 {키, 값} 쌍
    username: '',
    userpass: '',
    title: '',
    contents: ''
  });

const [resMessage, setResMessage] = useState('{}');



const handleChange = (e) => { //폼에서 글씨를 쓸 때마다 내용이 바뀌는걸 즉시 동기화 해주는 handleChange (안에 값이 바뀔 때 마다 새로바뀌어야한다.)
    e.preventDefault();
    const {name, value} = e.target; //object타입에서 안에있는 변수를 뽑아온다. 키 : 값 을 변수로 name, value로 정해서 바로 쓸 수 있게한다.
    setFormData({
        ...formData, //기존에 있는 오브젝트 타입을 가져와서
        [name] : value //안에 내용으로 바꿔라 이름(name)이 같은것의 값(value)를 바꿔준다.
    });
}

const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.username === ''){ //검증작업
      alert("이름을 입력하세요");
    } 
    else if(formData.userpass === ''){
      alert("비밀번호를 입력하세요")
    }
    try{
      const response = await axios.post('/api', formData); //앞의 주소로 formData를 보낸다. 다른서버로 보내려면 get으로 보내줘야한다.
      setResMessage(response.data.message); //서버(node)에 전송된 메세지를 받아온다.
    }
    catch(error){
      console.error(error);
    }
};

//console.log(formData); //이걸 확인하면 input값이 바뀔 때 마다 내용이 즉시동기화로 추가되는걸 볼 수 있다.
  return (
    <div style={{width:"800px", margin:"auto"}}>
        <h1 style={{textAlign:"center"}}>게시판 글쓰기</h1>
        <form onSubmit={handleSubmit}>
          <div style={{padding:"20px"}}> 
            <label htmlFor="username">이름</label>
            <input type="text" 
                    name="username" 
                    id="username" 
                    value={formData.username}
                    onChange={handleChange} />
          </div>
          <div style={{padding:"20px"}}> 
            <label htmlFor="userpass">비밀번호</label>
            <input type="text" 
                    name="userpass" 
                    id="userpass" 
                    value={formData.userpass}
                    onChange={handleChange} />
          </div>
          <div style={{padding:"20px"}}>
            <label htmlFor="title">제목</label> {/*react에서는 for를 htmlFor로 쓴다. */}
            <input type="text" 
                    name="title" 
                    id="title"
                    value={formData.title}
                    onChange={handleChange} />
          </div>
          <div style={{padding:"20px"}}>
            <label>내용</label>
            <textarea name="contents" 
                    id="contents" 
                    rows="7" 
                    style={{width:"100%"}}
                    onChange={handleChange} 
                    value={formData.contents}></textarea>
          </div>
          <div style={{textAlign:"center"}}>
            <button type="submit">전송</button>
          </div>
        </form>
        { resMessage && <List resMessage={resMessage} /> }
    </div>
  )
}

export default Form