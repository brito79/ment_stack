import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUI from '../components/rateLimitedUI'
import NotesNotFound from '../components/NotesNotFound'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from './NoteCard';

const HomePage = () => {

    const [isRateLimited, setIsRateLimited] =useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get('/notes');
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
                if (error.response && error.response.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to fetch notes. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchNotes();
    },[]);
  return (
    <div className='min-h-screen'>
        <NavBar />
        {isRateLimited && <RateLimitedUI />}

        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {isLoading && <div className='text-center text-primary py-10'><p>Loading notes...</p></div>}
            {notes.length === 0 && !isRateLimited && <NotesNotFound />}

            {notes.length > 0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map((note) => (
                        <div key={note._id} className='border p-4 rounded shadow'>
                            <NoteCard note={note} setNotes={setNotes} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default HomePage