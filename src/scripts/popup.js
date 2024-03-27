// popup.js
class Popup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
    }
  
    togglePopup = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };
  
    render() {
      return (
        <div className={`popup ${this.state.isOpen ? 'open' : ''}`} onClick={this.togglePopup}>
          <div className="popup__content">
            <button className="popup__close" onClick={(e) => e.stopPropagation()}>
              &times;
            </button>
            <h2>Popup Content</h2>
            <p>This is the content of the popup.</p>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<Popup />, document.getElementById('popup-root'));
  