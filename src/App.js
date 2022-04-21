import React,{useEffect, useState} from 'react';
import './style.css';
import { test_items, submissions } from './extras';

const App = () => {
  const questions = test_items;
  const [questionObject, setQuestionObject] = useState({});
  const [submissionsObject, setSubmissionsObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let correctCounter = 0;

    // to get questions by category
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
    // setting the submissions object
    const getSubmissionsById = ()=>{
        submissions.forEach((submission)=>{
            setSubmissionsObject((prevSubmissionObject)=>{
                return {
                    ...prevSubmissionObject,
                    [submission.questionId]: submission.status
                }
            })
        })
    }

  useEffect(()=>{
    getSubmissionsById();
    getQuestionsByCategory();
  },[]);

  return (
    <div className='list-container'>
        {Object.entries(questionObject).map((keyName, key)=>{
            return (
                <div key={key} className='category'>
                    <h2>{keyName[0]}- {correctCounter}/{keyName[1].length}</h2>
                    {keyName[1]?.map((question, index)=>{
                        const statusClass = submissionsObject[question.id]?.toLowerCase()?.replace('_', '-');
                        return (
                            <div className={`question`} key={question.id}>
                                <div className={`status ${statusClass}`}></div>
                                {submissionsObject[question.id] === 'CORRECT' && correctCounter++}
                                {question.name}
                            </div>
                        )
                    })}
                </div>
            )
        })}
    </div>
  )
};

export default App;
