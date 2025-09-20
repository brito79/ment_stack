import Note from '../model/Note.js'

export async function getAllNotes (req, res){
    try {
        const notes = await Note.find().sort({createdAt : -1});

        res.status(200).json(notes);
    } catch(error) {
        console.error(`Error fetching notes: ${error}`);
        res.status(500).send({message : 'Error fetching notes'});
    }
}

export async function createNote (req, res){
   try {
     const { title, content } = req.body;

     const note = new Note({title, content})
     await note.save();

     res.status(201).json(note);

   } catch(error) {
       console.error(`Error creating note: ${error}`);
       res.status(500).send({message : 'Error creating note'});
   }
}

export async function updateNote (req, res){
    try {
        const {title ,content} = req.body;

        const note = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if (!note) {
            res.status(404).json({message : 'Note not found'});
        }

        res.status(200).json(note);

    } catch(error) {
        console.error(`Error updating note: ${error}`);
        res.status(500).send({message : 'Error updating note'});
    }
}
    
export async function deleteNote (req, res){
   try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
        res.status(404).json({message : 'Note not found'});
    }
    res.status(201).json({message : "Deleted successfully"})
   } catch(error) {
         console.error(`Error deleting note: ${error}`);
         res.status(500).send({message : 'Error deleting note'});
   }

}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).json({messaage : "Note not found!"})
        }
        res.status(200).json(note);
    }catch (error) {
        console.error("Error in getNoteById to fetch note", error);
        res.status(404).send({message :"Failed to find note"});

    }
}