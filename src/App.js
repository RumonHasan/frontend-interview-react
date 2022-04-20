import React,{useEffect, useState} from 'react';
import './style.css';
import { test_items } from './extras';

const App = () => {
  const questions = test_items;
  const [questionObject, setQuestionObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // to get questions by category
  useEffect(()=>{
    const getQuestionsByCategory = ()=>{
        questions.forEach((question)=>{
            setQuestionObject((prevQuestionObject)=>{
                if(prevQuestionObject.hasOwnProperty(question.category)){
                    const oldQuestions = [...prevQuestionObject[question.category]];
                    return {
                        ...prevQuestionObject,
                        [question.category]: [...oldQuestions, question]
                    }
                }else{
                    // adds the question array to the new category inserted
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


  return (
    <div className='list-container'>

    </div>
  )
};

export default App;
