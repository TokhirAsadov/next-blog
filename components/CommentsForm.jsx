import React,{useState,useEffect,useRef} from 'react';
import {submitComment} from "../services";

const CommentsForm = ({slug}) => {

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(()=>{
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  const handleCommentSubmission = () => {
      setError(false);

      const { value: comment } = commentEl.current
      const { value: name } = nameEl.current
      const { value: email } = emailEl.current
      const { checked: storeData } = storeDataEl.current

      if (!comment || !name || !email){
        setError(true);
        return
      }

      const commentsObj = {name,email,comment,slug}

      if (storeData){
        window.localStorage.setItem("name",name)
        window.localStorage.setItem("email",email)
      }
      else {
        window.localStorage.removeItem("name")
        window.localStorage.removeItem("email")
      }

    submitComment(commentsObj)
      .then(res => {
        console.log(res,"res keldi")
        setShowSuccessMessage(true)
        setTimeout(()=>{
          setShowSuccessMessage(false);
        },5000)
      })
      .catch(err=>{
        console.log(err)
      })
  }


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold mb-8 pb-4">Comments</h3>
      <div className="grid grid-cols-1 gap-4 pb-4">
        <textarea
          name="comment"
          ref={commentEl}
          className="p-4 outline-none rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comments"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
        <input
          type="text"
          ref={nameEl}
          className="p-4 outline-none rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder={"Name"}
          name={"name"}
        />
        <input
          type="text"
          ref={emailEl}
          className="p-4 outline-none rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name={"email"}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 pb-4">
        <div className={"flex gap-4"}>
          <input
            type="checkbox"
            id={"storeData"}
            name={"storeData"}
            value={"true"}
            ref={storeDataEl}
          />
          <label htmlFor="storeData" className="text-gray-500 cursor-pointer">
            Save my name, email in this browser for the next time comment
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8 flex justify-between">
        <button
          type={"button"}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-400 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          onClick={handleCommentSubmission}
        >Post Comment</button>
        {showSuccessMessage && <span className="font-semibold text-green-500 text-xl float-right">Comment submitted for review</span>}
      </div>
    </div>
  );
};

export default CommentsForm;