import { useEffect, useState } from 'react';
import './App.css';

const FAQItem = ({ faq, index }) => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (index == 0) {
            setIsShow(true);
        }
    }, [])

    const handleClick = () => {
        setIsShow((isShow) => !isShow);
    }
    return (
        <div className="faq-box">
            <div className="que" onClick={handleClick}>
                <button className={isShow ? 'arrow' : ''}>></button>
                <div>{faq.question}</div>
            </div>
            {isShow && <div className='ans'>{faq.answer}</div>}
        </div>
    )
}

export default FAQItem;