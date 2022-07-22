/** @jsxImportSource @emotion/react */
import { portfolioStyle } from "./style/PortfolioCardStyle";
import { Skeleton, Popover } from "antd";

const SkeletonCard = ({ key }) => {
  const cardHeader = (
    <div style={{ cursor: "pointer" }}>
      <div>
        {/* <img src={thumbnail || "/image/profile_image_default.jpg"} /> */}
        <Skeleton.Image active />
        <div id="gradation">
          <div id="textbox">
            <h3>
              <Skeleton active />
            </h3>
            <Skeleton active />
          </div>
        </div>
        <div>
          <div>
            <Popover placement="bottom" content={""}>
              <h3>skills</h3>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
  const cardAvatar = <Skeleton.Avatar active shape="circle" />;

  return (
    <div id="check" css={portfolioStyle} key={key}>
      {cardHeader}
      <div>
        <div>
          {cardAvatar}
          <h3></h3>
        </div>
        <div>
          <div>
            <Skeleton.Avatar active shape="circle" />
          </div>
          <Skeleton active />
          <div>
            <Skeleton.Avatar active shape="circle" />
          </div>
          <Skeleton active />
          <div>
            <Skeleton.Avatar active shape="circle" />
          </div>
          <Skeleton active />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
