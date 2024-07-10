import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
// import { getVideosByChannel } from "../../redux/actions/videos.action";
// import VideoHorizontal from "../../components/videoHorizontal/videoHorizontal";
// import { getChannelDetails } from "../../redux/actions/channel.action";
const ChannelScreen = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getVideosByChannel());
    // dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  return (
    <>
      <Container>
        <Row className="mt-2">
          <h1>Loading........</h1>
          <h3>(Youtube API not allowing data for this action)</h3>
          Go back
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
