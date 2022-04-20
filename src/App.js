import React,{useEffect, useState} from 'react';
import './style.css';
import { test_items } from './extras';

const App = () => {
  const questions = test_items;
  const [questionObject, setQuestionObject] = useState({});

  // to get questions by category
  useEffect(()=>{
    const getQuestionsByCategory = ()=>{
        questions.forEach((question)=>{
            setQuestionObject((prevQuestionObject)=>{
                if(prevQuestionObject.hasOwnProperty(question.category)){
                    return {
                        ...prevQuestionObject,
                        [question.category]: prevQuestionObject[question.category].push(question)
                    }
                }else{
                    return {
                        ...prevQuestionObject,
                        [question.category]: [question]
                    }
                }
            })
        })
    }
    getQuestionsByCategory();
  },[]);

  console.log(questionObject);

  return (
    <div>App</div>
  )
};

export default App;
