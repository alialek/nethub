import { Caption, Card, Chip, Div, Title } from "@vkontakte/vkui";
import React from "react";
import {
  Icon28RadiowavesLeftAndRightCircleFillRed,
  Icon20RecentCircleFillYellow,
  Icon28UsersCircleFillGray,
} from "@vkontakte/icons";
import "./HubCard.css";
import ParticipantsCount from "./ParticipantsCount";
export function HubCard({
  status,
  description,
  rightIcon,
  className,
  title,
  logo,
  category,
  onClick,
  participants,
}) {
  return (
    <Card onClick={onClick} className={`hub-card`}>
      <Div>
        <div className={"hub-card__content"}>
          <div className="hub-card__left">
            {logo ? (
              <img alt="channel-logo" className={"hub-card__logo"} src={logo} />
            ) : (
              <Icon28UsersCircleFillGray
                width={56}
                height={56}
                className={"hub-card__logo"}
              />
            )}
            <ParticipantsCount participants={participants} />
          </div>
          <div className="hub-card__right">
            <div className="d-flex align-center justify-space-between hub-card__header">
              <div className="d-flex align-start ">
                {status === "online" ? (
                  <Icon28RadiowavesLeftAndRightCircleFillRed
                    width={20}
                    height={20}
                  />
                ) : (
                  <Icon20RecentCircleFillYellow width={20} height={20} />
                )}

                <Title
                  style={{ opacity: 0.7, marginLeft: 8 }}
                  className={"hub-card__title"}
                  level={3}
                  weight={"semibold"}
                >
                  {title}
                </Title>
              </div>
              {rightIcon}
            </div>
            <Caption level="1" weight="regular">
              {description}
            </Caption>
            {category && (
              <Chip style={{ marginTop: 8 }} removable={false}>
                {category}
              </Chip>
            )}
          </div>
        </div>
      </Div>
    </Card>
  );
}

export default React.memo(HubCard);
