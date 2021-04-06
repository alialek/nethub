import React from "react";
import { Icon28RadiowavesLeftAndRightCircleFillRed } from "@vkontakte/icons";
import { Icon20RecentCircleFillYellow } from "@vkontakte/icons";
import { Caption } from "@vkontakte/vkui";

export default function RoomStatus({ status }) {
  return (
    <div className="d-flex align-center justify-center">
      <div className="d-flex align-start ">
        {status === "online" ? (
          <Icon28RadiowavesLeftAndRightCircleFillRed width={20} height={20} />
        ) : (
          <Icon20RecentCircleFillYellow width={20} height={20} />
        )}

        <Caption
          style={{ marginLeft: 8 }}
          className={"hub-card__title"}
          level={3}
          weight={"semibold"}
        >
          {status === "online" ? "LIVE" : "SCHEDULED"}
        </Caption>
      </div>
    </div>
  );
}
