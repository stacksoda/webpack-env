import React from 'react';
import ReactDOM from 'react-dom';
import pic from './images/pic.png';
import './search.less';
import './fonts/iconfont';

class Search extends React.Component {

    render() {
        return <div className="search-text">
            Search Text
            <svg className="icon" ariaHidden="true">
                <use xlinkHref="#icon-icon-test9" />
            </svg>
            <img src={pic} />
            </div >
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)
