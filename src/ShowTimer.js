
const ShowTimer = (props) => {
    const { hourse,
        minutes,
        seconds,
        isPaused,
        handlePause,
        handleReset,
        handleResume
    } = props;
    return (
        <div className='show-contaienr'>
            <div className='timer-box'>
                <div>{hourse < 10 ? `0${hourse}` : hourse}</div>
                <span>:</span>
                <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
                <span>:</span>
                <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>

            <div className='action-box'>
                {
                    !isPaused && <button
                        onClick={handlePause}
                        className='timer-button'>Pause</button>
                }
                {
                    isPaused && <button
                        onClick={handleResume}
                        className='timer-button'>Resume</button>
                }
                <button className='timer-button'
                    onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}


export default ShowTimer;