import React from 'react';
import ReactDOM from 'react-dom';
import pic from './images/pic.png';
import './search.less';

class Search extends React.Component {

    render() {
        return <div className="search-text">
            Search Text <img src={pic} />
            </div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)
