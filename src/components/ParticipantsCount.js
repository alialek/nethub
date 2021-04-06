import React from "react";
import { Icon28HeadphonesOutline } from "@vkontakte/icons";
import { Icon24MusicMicOutline } from "@vkontakte/icons";
import { Caption } from "@vkontakte/vkui";

export default function ParticipantsCount({ participants }) {
  return (
    <div className="d-row justify-center align-center">
      <Icon28HeadphonesOutline height={16} />
      <Caption level={1}>{participants[1]}</Caption>
    </div>
  );
}
