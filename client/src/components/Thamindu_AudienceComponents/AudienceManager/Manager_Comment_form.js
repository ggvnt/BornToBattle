

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Style/Comment_form.css';


const CommentForm = ({ onAddComment }) => {

  const [comment, setComment] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/candidates');
    console.log('Candidates response:', response.data); // Log response data
    if (response.data.success && Array.isArray(response.data.existingCandidates)) {
      setCandidates(response.data.existingCandidates);
    } else {
      console.error('Invalid candidates data:', response.data);
    }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };//////////////////////////////


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const username = localStorage.getItem('username');
      const response = await axios.post('/comments', {
        comment,
        username,
        candidateId: selectedCandidate || null // Include selected candidate in the comment data
      });
      onAddComment(response.data);
      setComment('');
      setSelectedCandidate('');///////////

    } catch (error) {
      console.error('Error adding comment:', error);
      // alert("You don't have an account");
      window.location.href = '/managerSignin';
    }
  };




  return (
    <form onSubmit={handleSubmit} className='form-submit'>
      
      <textarea 
        className='input-submit'
        type="text" 
        placeholder="Write a comment" 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        required 
      />
      

      <button type="submit" className='btn-submit'>
        Submit
      </button>

    </form>
  );
};

export default CommentForm;
