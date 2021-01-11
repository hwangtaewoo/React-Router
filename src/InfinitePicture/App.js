import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import PictureList from './component/pictureList';

const Title = styled.h1`
  display: flex;
  justify-content: center;

  width: 15rem;
  padding: 1rem;
  margin: 0.5rem 0.5rem 0 0.5rem;
  border-radius: 10px;
  background-color: #ffe066;

  font-family: 'Roboto';
`;

const LoadingText = styled.h2`
  display: flex;
  justify-content: center;

  font-family: 'Roboto';
`;

class App extends Component {
  state = {
    images: []
  };

  componentDidMount() {
    this.getImages();
  };

  getImages = () => {
    axios
      .get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'WKdnXNbHSg9MnPSYdq1RbwVWc0fNM_8ELECXhIR5hMo',
          // client_id: 'z4Qnf_reTqGc5uZNA8iZ9D40qQL-E7kuz4m0Dw6Fx-M',
          // client_id: 'EeY0xxNv9tR3g56W_Z1-hR73A9BNcJq26l1HH_OVEzg',
          // client_id: 'aSaoYrLQXFca00oeG5F2pSWyc5aPdHH3S5TtVe3I8OI',
          count: 10
        }
      })
      .then(response => {
        this.setState({
          images: [...this.state.images, ...response.data.map(images => images.urls.small)],
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
        });
      });
  };

  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({
        items: this.getImages()
      });
    }, 2000);
  };


  render() {
    return (
      <div>
        <Title>Infinity Photos</Title>
        <InfiniteScroll
          dataLength={this.state.images}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<LoadingText>로딩 중...</LoadingText>}
        >
          <PictureList images={this.state.images} />
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;