import React, { useEffect } from "react";
import "../subscriptionScreen/_subscriptionScreen.scss";

import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannel } from "../../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../../components/videoHorizontal/videoHorizontal";

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscribedChannel());
  }, [dispatch]);

  const { loading, videos } = useSelector(
    (state) => state.subscriptionsChannel
  );
  return (
    <div>
      <Container fluid>
        {!loading ? (
          videos?.map((video) => (
            <VideoHorizontal video={video} key={video.id} subScreen />
          ))
        ) : (
          <h2>Loading....</h2>
        )}
      </Container>
    </div>
  );
};

export default SubscriptionScreen;
