import { useState } from "react"

const AddTask = ( {onAdd} ) => {
    const [text,setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text)
        {
            alert("Please add a text")
            return
        }

        onAdd({ text, day, reminder})

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input tye='text' placeholder='Add Text' value={text} onChange={(e)=> setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input tye='text' placeholder='Add Day & Time' value={day} onChange={(e)=> setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} checked={reminder} />
            </div>
            <input className='btn btn-block' type='submit' value='Save Task' />
        </form>
    )
}

export default AddTask