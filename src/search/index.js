import React from 'react';
import ReactDOM from 'react-dom';
import pic from '../images/pexels.jpeg';
import '../../common';
import './search.less';
import '../fonts/iconfont';
import { a } from './tree-shaking';

class Search extends React.Component {
    handleClick = () => {
        import('./text.js').then((text) => {
          console.log('text', text);
        });
    }

    render() {
      return (
        <div className="search-text">
            Change Search Text
          {' '}
          {a()}
          <svg className="icon" ariaHidden="true">
            <use xlinkHref="#icon-icon-test9" />
          </svg>
          <img src={pic} alt="hello" />
          <div onClick={this.handleClick} role="button" onKeyPress={this.handleClick} tabIndex={0}> test </div>
        </div>
      );
    }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root'),
);
