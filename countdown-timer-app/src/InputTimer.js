

const InputTimer = ({ handleInput, handleStart }) => {
    return (
        <div className='input-container'>
            <div className='input-box'>
                <input
                    onChange={handleInput}
                    id="hours" placeholder='HH' />
                <input
                    onChange={handleInput}
                    id="minutes" placeholder='MM' />
                <input
                    onChange={handleInput}
                    id="seconds" placeholder='SS' />
            </div>
            <button
                onClick={handleStart}
                className='timer-button'>Start</button>
        </div>
    )
}

export default InputTimer;