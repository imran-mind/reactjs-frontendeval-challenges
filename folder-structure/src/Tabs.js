import React, { useEffect } from "react";
import { useState } from "react";

const Tabs = (props) => {
    const [tabsHeaders, setTabsHeaders] = useState([]);
    const [contentMap, setContentMap] = useState({});
    const [active, setActive] = useState('');
    // {title: tab content}
    const { children } = props;
    useEffect(() => {
        const headers = [];
        const map = {};
        React.Children.forEach(children, (element) => {
            console.log('Element : ', element);
            if (!React.isValidElement(element))
                return;
            const { title } = element.props;
            headers.push(title);
            map[title] = element.props.children;
        });
        console.log('map -> ', map);
        setTabsHeaders(headers);//Headers 
        setActive(headers[0]);
        setContentMap(map);//content
    }, [props, children]);

    const changeTab = (header) => {
        setActive(header);
    }
    return <div>

        <div className="headers">
            {
                tabsHeaders.map((header) => (
                    <button
                        className={active === header ? 'selected' : ''}
                        key={header}
                        onClick={() => changeTab(header)}
                    >{header}</button>
                ))
            }
        </div>
        {/* ['Home','About'] */}
        <div>
            {
                Object.keys(contentMap).map((key, idx) => {
                    if (key === active) {
                        return <div key={idx}>
                            {contentMap[key]}
                        </div>
                    } else {
                        return null;
                    }
                })
            }
        </div>
    </div>
}

export default Tabs;