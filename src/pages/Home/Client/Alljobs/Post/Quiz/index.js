import React, { useEffect, useState } from 'react';
import { db } from '../../../../../../components/firebase';
import { useSelector } from 'react-redux';
import swal from '@sweetalert/with-react';

function Quiz({ jobId, handleClose3 }) {
    const authId = useSelector((state) => state.authId);
    const [currentUser, setCurrentUser] = useState('')
    const applicantID = db.collection('jobs').doc(jobId).collection("applicants").doc().id
  
    useEffect(() => {
      db.collection('users').doc(`${authId}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
  }, [])

  const [questions, setQuestions] = useState([
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Madrid', 'Berlin'],
      answer: 'Paris'
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Venus'],
      answer: 'Jupiter'
    },
    {
      question: 'What is the smallest country in the world?',
      options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
      answer: 'Vatican City'
    },{
        question: 'Which country is found in Eastern Africa?',
        options: ['Burundi', 'Venezuela', 'Saudi Arabia', 'Brazil'],
        answer: 'Burundi'
      },
      {
        question: 'Which is of the following is not a programming language?',
        options: ['C++', 'Python', 'React', 'C#'],
        answer: 'React'
      },
      {
        question: 'Who among the following is a musician?',
        options: ['Son', 'Christiano Ronaldo', 'Barack Obama', 'Chris Brown'],
        answer: 'Chris Brown'
      },{
        question: 'Which of the following is a plant?',
        options: ['mammals', 'reptiles', 'eukaryotes', 'amphibians'],
        answer: 'eukaryotes'
      },{
          question: 'The most famous person on Instagram?',
          options: ['Cr7', 'The Rock', 'Araina Grande', 'Sauti Sol'],
          answer: 'Cr7'
        },
        {
          question: 'Which of the following is not involved in religion?',
          options: ['Budhaa', 'Christianity', 'Science', 'Islamic'],
          answer: 'Science'
        },
        {
          question: 'Which of the following is not a college?',
          options: ['Kenya water Institute', 'University Of Nairobi', 'KMTC', 'Don Bosco'],
          answer: 'University Of Nairobi'
        }
  ]);

  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const applyJob = () => {
    db.collection("jobs").doc(jobId).collection("applicants").doc(applicantID).set({
        score:score,
        firstName:currentUser?.firstName,
        lastName:currentUser?.lastName,
        email:currentUser?.email,
        timestamp:Date.now(),
        applicantID
    })
    handleClose3()
    swal("Successfully applied for the job!")
  }

  return (
    <div style={{margin:'auto',display:'table'}}>
       <center>You need to score 8/10 to proceed!</center>
      {questions.map((question, index) => (
        <div key={index}>
          <h2>{question.question}</h2>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleAnswerSelect(index, option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {score > 0 && <p style={{marginTop:5}}>Your score: {score}</p>}
      <button onClick={handleSubmit}>Submit</button>

      {score >= 8 &&(
        <button onClick={applyJob} style={{marginLeft:5}}>Apply Job</button>
      )}
      
    </div>
  );
}

export default Quiz;
