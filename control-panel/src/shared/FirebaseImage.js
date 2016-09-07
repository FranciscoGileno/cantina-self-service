import React from 'react';
import Loading from './Loading';

class FirebaseImage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true
    };

    this.storage = context.storage;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.storageUrl !== this.props.storageUrl)
      this.refreshImage(nextProps.storageUrl);
  }

  componentDidMount() {
    this.refreshImage(this.props.storageUrl);
  }

  refreshImage = (storageUrl) => {
    this.setState({ loading: true });

    if (storageUrl) {
      this.storage.refFromURL(storageUrl).getMetadata().then((metadata) => {
        this.setState({
          storageUrl: metadata.downloadURLs[0],
          loading: false,
        })
      });
    }
  }

  render() {
    return (
      this.state.loading
        ? <div className="css-card__img"><Loading /></div>
        : <img src={this.state.storageUrl} className="css-card__img" alt={name} />
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
