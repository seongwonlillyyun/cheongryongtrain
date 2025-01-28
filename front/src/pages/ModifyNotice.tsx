import React, { useState,  useRef, useEffect,  } from 'react';
import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/admin.css'
import { useMemo } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { ImageResize } from 'quill-image-resize-module-ts';
Quill.register('modules/ImageResize', ImageResize);


const ModifyNotice = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [imgURL, setImgURL] = useState<string>('');
    const navigate = useNavigate()
    const quillRef = useRef<any>(null)
   
    const {id} = useParams()
    useEffect(()=>{
        axios({
            url:`http://127.0.0.1:8080/notice/noticedetail/${id}`,
            method:'get'
        })
        .then((res)=>{setTitle(res.data[0].title);
                        setContent(res.data[0].content)
        })
        .catch((error)=>console.log(error))
    },[])

    const imageHandler = () =>{
        const input = document.createElement('input')
        input.setAttribute('type','file') // 파일을 업로드 할 수 있는 인풋 생성
        input.setAttribute('accept','image/*') // 그러나 이미지 파일만 가능함
        input.click();

        input.addEventListener('change',async()=>{
            const file : File | undefined = input.files?.[0] 
            if(!file){
                console.error("no file selected");
                return;
            } // 선택한 파일 중 첫번째 파일만 의미
            const formData:FormData = new FormData();
            formData.append('img',file); // 폼데이터에 키가 img이고 올린 파일이 값인 객체를 추가 , 없으면 blob으로 처리
            try {
                const result = await axios.post('http://127.0.0.1:8080/notice/img',formData,{
                    headers :{
                        'Content-Type':"multipart/form-data",
                    },
                })
                console.log("FormData Content:", formData.get("img"));

                const imgURL = result.data.url;
                setImgURL(imgURL)
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, 'image', imgURL)
            } catch (error) {
                console.log('실패')
            }
        })
    }

    const handlesubmit = () =>{
        
        const postData = {
            title,
            content,
            imgURL:imgURL,
            id : id
        }
        try {
            axios({
                url:"http://127.0.0.1:8080/notice/modify",
                method:'post',
                data:postData
            })
            .then((res)=>{
                if(res.data.cnt === 1){
                    alert('공지사항이 수정 되었습니다.')
                    console.log(postData)
                    navigate('/notice')
                } else{
                    alert('오류입니다.')
                }
            })
        } catch (error) {
            console.log(error)
        }
      
    }
    const modules:{} = useMemo(() => ({
        toolbar: {
            container: [
                ["image"],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                [{ header: [1, 2, 3, 4, 5, false] }],
                ["bold", 'italic', 'underline', 'strike','blockquote', 'code-block'],
                [{ 'font': [] }],
            ],
            handlers:{
                image:imageHandler,
            }
        },
        ImageResize :{
                    modules :['Resize', 'DisplaySize']
                }
        
    }), []);
return(
    <>
        <div id='notice_write' className='notice_write'>
            <div className='notice_write_header'>
                <h1 className='notice_write_title'>공지사항 수정하기</h1>
            </div>
            <div className='notice_write_content'>
                <input type="text"
                placeholder='제목'
                className='notice_box_title'
                value={title} 
                onChange={(e)=>setTitle(e.target.value)}/>
                <ReactQuill theme="snow" 
                    ref={quillRef}
                    modules={modules} 
                    placeholder='내용을 입력해 주세요'
                    onChange={setContent}
                    value={content}
                    style={{margin:'0 100px', height:'500px'}}/>
            </div>
            <ul className='noticebtnlist'>
                <li><button className='notice_write_cancle'
                        onClick={()=>navigate('/admin')}>취소하기</button></li>
                <li><button className='notice_write_submit'
                            onClick={()=>handlesubmit()}>수정하기</button></li>
            </ul>
        </div>
    </>
  );
}
export default ModifyNotice;