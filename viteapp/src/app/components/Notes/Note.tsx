import { DeleteForeverOutlined } from "@mui/icons-material";
import "./css/Notes.css"
interface NoteProps {
    id: string;
    text: string;
    deleteNote: (id: string) => void;
}

const Note = ({ id, text, deleteNote }: NoteProps) => {
    return (
        <div className="note">
            <div className="note__body">{text}</div>
            <div className="note__footer" style={{ justifyContent: "flex-end" }}>
                <DeleteForeverOutlined
                    className="note__delete"
                    aria-hidden="true"
                    onClick={() => deleteNote(id)}
                />
            </div>
        </div>
    );
};

export default Note;