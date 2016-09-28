import React from 'react';
import Loading from './Loading';
import classnames from 'classnames';

class FirebaseImage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true
    };

    this.storage = context.storage;
  }

  componentWillRecestorageiveProps(nextProps) {
    if (nextProps.storageUrl !== this.props.storageUrl)
      this.refreshImage(nextProps.storageUrl);
  }

  componentDidMount() {
    this.refreshImage(this.props.storageUrl);
  }

  refreshImage = (storageUrl) => {
    if (storageUrl) {
      this.setState({ loading: true });
      this.storage.refFromURL(storageUrl).getMetadata().then((metadata) => {
        this.setState({
          storageUrl: metadata.downloadURLs[0],
          loading: false,
        })
      });
    }
  }

  render() {
    const imgClass = classnames({
      'css-card__img': true,
      'css-card__img--disabled': this.props.disabled
    });
    return (
      this.state.loading
        ? <div className="css-card__img"><Loading /></div>
        : <img src={this.state.storageUrl} className={imgClass} alt={name} />
    )
  }
}

FirebaseImage.propTypes = {
  storageUrl: React.PropTypes.string.isRequired,
}

FirebaseImage.contextTypes = {
  storage: React.PropTypes.object,
};

export default FirebaseImage;
