import { LinearProgress } from "@mui/material";

interface CreateNoteProps {
    textHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    saveHandler: () => void;
    inputText: string;
}

const CreateNote = ({ textHandler, saveHandler, inputText, }: CreateNoteProps) => {
    const charLimit = 100;
    const charLeft = charLimit - inputText.length;
    const charPercent = (inputText.length / charLimit) * 100;

    return (
        <div className="note" style={{ background: "rgba(255,255,255,0" }}>
            <textarea
                cols={10}
                rows={5}
                value={inputText}
                placeholder="Type .... "
                onChange={textHandler}
                maxLength={charLimit}
            ></textarea>
            <div className="note__footer">
                <span className="label">{charLeft}  left</span>
                <button className="note__save" onClick={saveHandler}>Save</button>
            </div>
            <LinearProgress
                className="char_progress"
                variant="determinate"
                value={charPercent}
            />
        </div>
    )
};

export default CreateNote;