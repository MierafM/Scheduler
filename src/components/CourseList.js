import React, { useState, useEffect } from 'react';
import {hasConflict, getCourseTerm, terms } from '../utilities/times';
import Course from './Course';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase';
// creates term var and sets it to default, passes state to term selector
const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);

    if (scheduleChanged(selected, courses)) {
        setSelected([])
      };
      
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    
    return (
      <>
        <TermSelector term={term} setTerm={setTerm} />
        <div className="course-list">
        { 
          termCourses.map(course =>
            <Course key={ course.id } course={ course }
              selected={selected} setSelected={ setSelected } 
            />) 
        }
        </div>
      </>
    );
  };

// each term button calls setTerm to update term
const TermButton = ({term, setTerm, checked}) => (
<>
    <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
    onChange={() => setTerm(term)} />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
</>
);

// creates button and makes sure selected button is highlighted
const TermSelector = ({term, setTerm}) => {
  const [user] = useUserState();
  return (
    <div className="btn-toolbar justify-content-between">
      <div className="btn-group">
      { 
        Object.values(terms).map(
          value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
        )
      }
      </div>
      { user ? <SignOutButton /> : <SignInButton /> }
    </div>
  );
};

const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

const scheduleChanged = (selected, courses) => (
selected.some(course => course !== courses[course.id])
);

export default CourseList;